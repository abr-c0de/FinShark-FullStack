# 🦈 FinShark - Fullstack Finance App

![.NET 8](https://img.shields.io/badge/.NET_8-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React_Vite-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A comprehensive fullstack web application that allows users to search for stock data, analyze detailed financial statements, manage personal stock portfolios, and leave insights via comments.

This project demonstrates a robust, scalable backend using the **Controller -> Service -> Repository** design pattern, paired with a fast, responsive frontend.

## ✨ Features

* **Secure Authentication:** User registration and login powered by ASP.NET Core Identity and JWT Authentication.
* **In-Depth Financial Data:** Integration with the Financial Modeling Prep API to display:
  * Company Profiles
  * Income Statements
  * Balance Sheets
  * Cashflow Statements
* **Portfolio Management:** Authenticated users can easily add or remove specific stocks from their personal tracking portfolio.
* **Community Comments:** Users can leave and read comments on individual stock pages.

## 🛠️ Tech Stack

### Frontend (`/frontend`)
* React (Vite)
* TypeScript
* Tailwind CSS

### Backend (`/Api`)
* ASP.NET Core Web API (.NET 8)
* Entity Framework Core 8
* MS Identity & JWT
* Newtonsoft.Json

### Database & External Services
* Microsoft SQL Server
* Financial Modeling Prep (FMP) API

## 🏗️ Architecture & Folder Structure

The application is split into two main directories. The backend utilizes a strict **Controller -> Service -> Repository** pattern to ensure a clean separation of concerns, making the codebase highly maintainable and testable.

<details>
<summary><b>Click to expand the Folder Structure</b></summary>

```text
📦 FinShark
 ┣ 📂 Api                # .NET 8 Web API Backend
 ┃ ┣ 📂 Controllers      # API Endpoints (Routing & HTTP handling)
 ┃ ┣ 📂 Data             # EF Core DbContext 
 ┃ ┣ 📂 DTOs             # Data Transfer Objects
 ┃ ┣ 📂 Extensions       # Extensions for getting ClaimPrincipal
 ┃ ┣ 📂 Helpers          # Helper classes for Query objects
 ┃ ┣ 📂 Interfaces       # Contracts for Services and Repositories
 ┃ ┣ 📂 Mappers          # Manual Mapper
 ┃ ┣ 📂 Models           # Domain Entities
 ┃ ┣ 📂 Repositories     # Direct Database Access Logic
 ┃ ┗ 📂 Services         # Core Business Logic
 ┃
 ┗ 📂 frontend           # React Vite Frontend
   ┣ 📂 src
   ┃ ┣ 📂 api            # Axios/Fetch calls to backend and external APIs
   ┃ ┣ 📂 components     # Reusable UI components
   ┃ ┣ 📂 Context        # Custom hooks for Registration and Login functions
   ┃ ┣ 📂 Helpers        # Number formatter and error handling
   ┃ ┣ 📂 models         # TypeScript interfaces/types
   ┃ ┣ 📂 pages          # Main routing views
   ┃ ┣ 📂 Routes         # Routers and Protected Routes
   ┃ ┗ 📂 Services       # Business logic and fetching data from API
```
</details>

### 🚀 Getting Started

Prerequisites :

.NET 8 SDK

Node.js

SQL Server (Local or hosted)

Financial Modeling Prep API Key

#### Backend Setup (/Api)

1. Navigate to the backend directory:

``` bash
cd Api

```

2. Update the appsettings.json file with your SQL Server connection string and API keys:

``` json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=FinanceAppDb;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "JWT": {
    "Issuer": "https://localhost:5001",
    "Audience": "https://localhost:5001",
    "SecretKey": "YOUR_SUPER_SECRET_KEY_HERE"
  },
  "FMPKey": "YOUR_FMP_API_KEY_HERE"
}

```

3. Apply Entity Framework migrations to build the database:

``` bash
dotnet ef database update
```


3. Run the API:

``` bash
dotnet run
```

#### Frontend Setup (/frontend)

1. Open a new terminal and navigate to the frontend directory:

``` bash
cd frontend
```

2. Install the necessary dependencies:

``` bash
npm install
```

3. Start the Vite development server:

``` bash
npm run dev
```

### 🗄️ Database Schema & Relationships
The application uses Entity Framework Core 8 to manage the database schema. Below are the core entities and how they relate to one another:

Core Entities
AppUser: Inherits from ASP.NET Core IdentityUser to handle robust authentication, authorization, and user data.

Stock: Represents a financial asset tracking properties like Symbol, CompanyName, Purchase price, MarketCap, and Industry.

Comment: User-generated commentary attached to specific stocks, tracking Title, Content, and CreatedAt timestamps.

Portfolio: A join entity that explicitly manages the many-to-many relationship between Users and the Stocks they are tracking.

Relationships :

User ↔️ Portfolio ↔️ Stock (Many-to-Many): An AppUser can track many Stocks, and a Stock can be tracked by many AppUsers. The Portfolio table acts as the bridge.

User ➡️ Comment (One-to-Many): An AppUser can author multiple Comments.

Stock ➡️ Comment (One-to-Many): A Stock can have multiple Comments associated with it.



#### Entity-Relationship Diagram

erDiagram
    AppUser ||--o{ Portfolio : tracks
    AppUser ||--o{ Comment : writes
    Stock ||--o{ Portfolio : included_in
    Stock ||--o{ Comment : has

    AppUser {
        string Id PK
        string UserName
        string Email
    }
    Stock {
        int Id PK
        string Symbol
        string CompanyName
        decimal Purchase
        decimal LastDiv
        string Industry
        decimal MarketCap
    }
    Portfolio {
        string AppUserId FK
        int StockId FK
    }
    Comment {
        int Id PK
        string Title
        string Content
        DateTime CreatedAt
        int StockId FK
        string AppUserId FK
    }



## 📡 API Endpoints

This application exposes a RESTful API built with ASP.NET Core. Below are the primary endpoints available:

### 🔐 Authentication (`/api/account`)
| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `POST` | `/api/account/register` | Registers a new user and returns a JWT | No |
| `POST` | `/api/account/login` | Authenticates a user and returns a JWT | No |

### 📈 Portfolio (`/api/portfolio`)
| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `GET` | `/api/portfolio` | Gets the current user's tracked stocks | Yes |
| `POST` | `/api/portfolio?symbol={symbol}` | Adds a stock to the user's portfolio | Yes |
| `DELETE`| `/api/portfolio?symbol={symbol}` | Removes a stock from the portfolio | Yes |

### 💬 Comments (`/api/comment`)
| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `GET` | `/api/comment?symbol={symbol}` | Retrieves all comments for a specific stock | No |
| `POST` | `/api/comment/{symbol}` | Creates a new comment for a stock | Yes |
| `PUT` | `/api/comment/{id}` | Updates an existing comment | Yes |
| `DELETE`| `/api/comment/{id}` | Deletes a comment | Yes |

### 🏢 Stocks (`/api/stock`)
| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `GET` | `/api/stocks` | Retrieves paginated list of stocks from DB | Yes |
| `GET` | `/api/stocks/{symbol}` | Retrieves details for a specific stock | Yes |
| `POST` | `/api/stocks` | Creates a new stock | Yes |


