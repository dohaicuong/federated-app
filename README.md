# Chatapp project
This is fullstack project for a chatapp application.
It was created to bring the tools I know together as a stack, workflow.
Not a final production.

## Getting start
```
docker-compose up -d
```

- frontend: http://localhost:3000
- api gateway: http://localhost:5000

### Start develop

Services are build with hot reload in container, just go and edit the code.

Logging `docker logs $SERVICE_NAME`

### Start develop frontend

To use GraphQL Code Gen

```
cd frontend
yarn gen --watch
```

### Start develop components

```
cd frontend
yarn storybook
```

## TODO
- Finish all the tests
- Storybook documents generate for components
- CI/CD
- Logging, tracing(Open Telemetry, Jaeger)
- Migrate to Apollo Federation when Graphql subscription is supported
- Migrate to Prisma 2 when it's released
- Event driven (Kafka)
- Try a Go service
- Try a Rust service