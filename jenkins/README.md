# Jenkins con Docker-in-Docker

Incluye Jenkins LTS con Docker CLI y Docker Compose v2, más plugins para Docker y Docker Compose.

## Uso

1. Construir y levantar:

```bash
docker compose up -d --build
```

2. Abrir Jenkins:

- http://localhost:8080

3. Obtener el password inicial:

```bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## Notas

- Jenkins se conecta al daemon Docker del servicio `dind` vía `DOCKER_HOST=tcp://dind:2375`.
- `dind` corre en modo privilegiado para habilitar Docker-in-Docker.
- Si quieres usar el socket del host en lugar de dind, avísame y lo ajusto.
