import { dbClient } from "../db.js";
import { TODOS } from "../constantes/constantes.js";

// Agrega logs estructurados en cada endpoint
export const GetTodos = async (req, res) => {
    req.log.info("Obteniendo todos los TODOs");
    const { rows } = await dbClient.query(`SELECT * FROM todos`);
    res.status(200).json(rows);
};

export const GetTodoByIdSample = (req, res) => {
    const { id } = req.params;
    const resultadoBusqueda = TODOS.filter(x => x.id == id);

    req.log.info({ id }, "Buscando TODO de prueba por ID");

    if (resultadoBusqueda.length > 0) {
        res.status(200).json(resultadoBusqueda[0]);
    } else {
        res.status(404).json({
            mensaje: `No se encontró producto con id ${id}`
        });
    }
};

export const GetTodoById = async (req, res) => {
    const { id } = req.params;
    req.log.info({ id }, "Buscando TODO en la base de datos");

    const { rows } = await dbClient.query(
        `SELECT * FROM todos WHERE id = $1`,
        [id]
    );

    if (rows.length > 0) {
        res.status(200).json(rows[0]);
    } else {
        res.status(404).json({
            mensaje: `No se encontró producto con id ${id}`
        });
    }
};

export const CompleteTodo = async (req, res) => {
    const { id } = req.params;
    req.log.info({ id }, "Marcando TODO como completado");

    const { rows } = await dbClient.query(
        `UPDATE todos SET complete = '1' WHERE id = $1 RETURNING *`,
        [id]
    );

    if (rows.length > 0) {
        res.status(200).json(rows[0]);
    } else {
        res.status(404).json({
            mensaje: `Todo no existe`
        });
    }
};

export const DeleteTodo = async (req, res) => {
    const { id } = req.params;
    req.log.info({ id }, "Eliminando TODO");

    const { rows } = await dbClient.query(
        `DELETE FROM todos WHERE id = $1 RETURNING *`,
        [id]
    );

    if (rows.length > 0) {
        res.status(200).json(rows[0]);
    } else {
        res.status(404).json({
            mensaje: `Todo no existe`
        });
    }
};

export const CreateTodo = async (req, res) => {
    try {
        const { name, description } = req.body;
        const complete = 0;

        req.log.info({
            name,
            description
        }, "Creando nuevo TODO");

        const { rows } = await dbClient.query(
            "INSERT INTO todos (name, description, complete) VALUES ($1, $2, $3) RETURNING *",
            [name, description, complete]
        );

        res.status(201).json({
            mensaje: "Todo creado correctamente",
            data: rows[0]
        });
    } catch (error) {
        req.log.error({ error: error.message }, "Error al crear TODO");
        res.status(500).json({
            mensaje: error.message
        });
    }
};
