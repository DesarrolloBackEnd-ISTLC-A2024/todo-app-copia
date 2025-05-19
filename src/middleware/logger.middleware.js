// src/middleware/logger.middleware.js
import fetch from "node-fetch";

export const seqLoggerMiddleware = (req, res, next) => {
    const start = Date.now();

    // Inyectar req.log.info y req.log.error para uso en los controladores
    req.log = {
        info: (data = {}, message = "Info") => {
            sendLog({
                level: "Information",
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: Date.now() - start,
                body: req.body,
                params: req.params,
                query: req.query,
                ...data,
                message,
            });
        },
        error: (data = {}, message = "Error") => {
            sendLog({
                level: "Error",
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                body: req.body,
                params: req.params,
                query: req.query,
                ...data,
                message,
            });
        }
    };

    // Log automático cuando la respuesta termina
    res.on("finish", () => {
        const duration = Date.now() - start;
        const logObject = {
            "@t": new Date().toISOString(),
            "@m": `HTTP ${req.method} ${req.originalUrl} - ${res.statusCode} in ${duration}ms`,
            "@l": "Information",
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration,
            body: req.body,
            params: req.params,
            query: req.query,
        };

        fetch("http://localhost:5341/api/events/raw", {
            method: "POST",
            headers: {
                "Content-Type": "application/vnd.serilog.clef",
            },
            body: JSON.stringify(logObject),
        }).catch((err) => {
            console.error("Error enviando log automático a Seq:", err.message);
        });
    });

    next();
};

// Función auxiliar para enviar logs personalizados
function sendLog({ level, message, ...rest }) {
    const log = {
        "@t": new Date().toISOString(),
        "@m": message,
        "@l": level,
        ...rest,
    };

    fetch("http://localhost:5341/api/events/raw", {
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.serilog.clef",
        },
        body: JSON.stringify(log),
    }).catch((err) => {
        console.error("Error enviando log a Seq:", err.message);
    });
}
