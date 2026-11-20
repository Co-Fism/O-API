<h1 align="center">O-API</h1>
<h2 align="center">0.15.3</h2>


<pre>
O-API/
├── .github/
│   └── workflows/
├── src/
│   ├── Modules/
│   │   ├── Address/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Exceptions/
│   │   │   │   ├── Repositories/
│   │   │   │   └── ValueObjects/
│   │   │   ├── Infrastructure/
│   │   │   │   ├── Mappers/
│   │   │   │   ├── Repositories/
│   │   │   │   └── Schemas/
│   │   │   └── Address.module.ts
│   │   │
│   │   ├── Auth/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Enums/
│   │   │   │   └── Repositories/
│   │   │   ├── Infrastructure/
│   │   │   │   └── Repositories/
│   │   │   └── Auth.module.ts
│   │   │
│   │   ├── Cart/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   ├── Mapper/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Events/
│   │   │   │   ├── Exceptions/
│   │   │   │   ├── Repositories/
│   │   │   │   └── ValueObjects/
│   │   │   ├── Infrastructure/
│   │   │   │   ├── Mapper/
│   │   │   │   ├── Repositories/
│   │   │   │   └── Schemas/
│   │   │   └── Cart.module.ts
│   │   │
│   │   ├── Notification/
│   │   │   ├── Application/
│   │   │   │   ├── Handlers/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Enums/
│   │   │   │   └── Interfaces/
│   │   │   ├── Infrastructure/
│   │   │   │   └── Providers/
│   │   │   └── Notification.module.ts
│   │   │
│   │   ├── Order/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Enums/
│   │   │   │   ├── Events/
│   │   │   │   ├── Exceptions/
│   │   │   │   ├── Repositories/
│   │   │   │   └── ValueObjects/
│   │   │   ├── Infrastructure/
│   │   │   │   ├── Mappers/
│   │   │   │   ├── Repositories/
│   │   │   │   └── Schemas/
│   │   │   └── Order.module.ts
│   │   │
│   │   ├── Payment/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Enums/
│   │   │   │   ├── Events/
│   │   │   │   ├── Exceptions/
│   │   │   │   ├── Repositories/
│   │   │   │   └── ValueObjects/
│   │   │   ├── Infrastructure/
│   │   │   │   ├── Gateways/
│   │   │   │   ├── Mappers/
│   │   │   │   ├── Repositories/
│   │   │   │   └── Schemas/
│   │   │   └── Payment.module.ts
│   │   │
│   │   ├── Product/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   ├── Mappers/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Enums/
│   │   │   │   ├── Events/
│   │   │   │   ├── Exceptions/
│   │   │   │   ├── Repositories/
│   │   │   │   └── ValueObjects/
│   │   │   ├── Infrastructure/
│   │   │   │   ├── Mappers/
│   │   │   │   ├── Repositories/
│   │   │   │   └── Schemas/
│   │   │   ├── Category.module.ts
│   │   │   └── Product.module.ts
│   │   │
│   │   ├── Reviews/
│   │   │   ├── Application/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Dtos/
│   │   │   │   ├── Mappers/
│   │   │   │   └── Services/
│   │   │   ├── Domain/
│   │   │   │   ├── Entities/
│   │   │   │   ├── Exceptions/
│   │   │   │   ├── Repositories/
│   │   │   │   └── ValueObjects/
│   │   │   ├── Infrastructure/
│   │   │   │   ├── Mappers/
│   │   │   │   ├── Repositories/
│   │   │   │   └── Schemas/
│   │   │   └── Review.module.ts
│   │   │
│   │   └── User/
│   │       ├── Application/
│   │       │   ├── Controllers/
│   │       │   ├── Dtos/
│   │       │   └── Services/
│   │       ├── Domain/
│   │       │   ├── Entities/
│   │       │   ├── Enums/
│   │       │   ├── Events/
│   │       │   ├── Exceptions/
│   │       │   ├── Repositories/
│   │       │   └── ValueObjects/
│   │       ├── Infrastructure/
│   │       │   ├── Mappers/
│   │       │   ├── Repositories/
│   │       │   └── Schemas/
│   │       └── User.module.ts
│   │
│   ├── Shared/
│   │   ├── Configs/
│   │   ├── Decorators/
│   │   ├── Domain/
│   │   ├── Exceptions/
│   │   ├── Filters/
│   │   ├── Guards/
│   │   ├── Interceptors/
│   │   ├── Ports/
│   │   ├── Redis/
│   │   ├── Storage/
│   │   ├── Utils/
│   │   └── Validators/
│   │
│   ├── app.module.ts
│   ├── instrument.ts
│   └── main.ts
│
├── .dockerignore
├── .editorconfig
├── .env.example
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── Structure.md
├── docker-compose.yml
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
└── tsconfig.json
</pre>