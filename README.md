
# Proyecto TODO - Backend con Logs en Seq

Este proyecto tiene un middleware que manda logs estructurados a [Seq](https://datalust.co/seq), que es una plataforma genial para manejar logs de forma ordenada.

---

## 🐳 Cómo levantar Seq con Docker

Para tener Seq corriendo local, solo tienes que pegar este comando en la terminal:

```bash
docker run --name seq -d --restart unless-stopped -e ACCEPT_EULA=Y -p 5341:5341 datalust/seq
```

- `--name seq`: Le ponemos nombre al contenedor.
- `-d`: Lo corre en segundo plano, para que no te estorbe.
- `--restart unless-stopped`: Si tu compu se reinicia, Seq también vuelve a arrancar solo.
- `-e ACCEPT_EULA=Y`: Acepta la licencia sin que tengas que hacerlo manual.
- `-p 5341:5341`: Abre el puerto para que puedas entrar desde el navegador.

---

## 🔗 Cómo entrar a la consola de Seq

Abre el navegador y entra a esta dirección:

```
http://localhost:5341
```

Ahí verás todos los logs que tu app le está mandando a Seq en tiempo real.

---

## 📝 Cómo funcionan los logs en el backend

- Los logs se mandan solos en formato JSON, súper organizados.
- Incluyen info útil: método HTTP, ruta, status code, cuánto tarda la respuesta, parámetros, querys y el body de la petición.
- Además, en tus controladores podés usar `req.log.info()` o `req.log.error()` para meter logs manuales cuando quieras.

---

## Carpeta de imágenes

Podés ver las capturas acá: [Carpeta de imágenes](https://drive.google.com/drive/folders/1KWXv0Fn7p9EMC3jpDBwTwmAhOeGdLm4s?usp=drive_link)


---

## 🚀 Cómo arrancar el backend

El servidor se levanta en el puerto 4000 y va enviando logs directo a Seq.

---
