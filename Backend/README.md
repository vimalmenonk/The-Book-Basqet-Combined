# The Book Basqet Backend

A layered ASP.NET Core Web API for an online bookstore/cart experience. The project is split into API, Application, Domain, and Infrastructure layers.

## Project structure

- `BookBasqet.API` - HTTP API, middleware, controllers, Swagger config.
- `BookBasqet.Application` - DTOs, interfaces, and business services.
- `BookBasqet.Domain` - Core entities and enums.
- `BookBasqet.Infrastructure` - persistence, dependency injection, security, and email implementations.

## Prerequisites

- .NET SDK `7.0.410` (see `BookBasqet.API/global.json`)

## Run locally

From the repository root:

```bash
cd BookBasqet.API
dotnet restore
dotnet run
```

By default, the API is configured with an in-memory database and seeds initial data at startup.

## API docs (Swagger)

After starting the API, open:

- `http://localhost:5000/swagger`
- `https://localhost:5001/swagger`

(Actual port may vary based on your local ASP.NET Core launch profile.)

## Key capabilities

- Authentication (JWT)
- Books and categories endpoints
- Cart management
- Order placement
- Order email templates

## Configuration

Main settings are in:

- `BookBasqet.API/appsettings.json`
- `BookBasqet.API/appsettings.Development.json`

You can configure:

- CORS allowed origins
- JWT/token settings
- SMTP email options

## Notes

- Email templates are stored in `BookBasqet.API/EmailTemplates`.
- Swagger is enabled in the current startup configuration.
