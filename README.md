# ⚠️ Important Notice
It was built as part of my **Full Stack Web Development Diploma at [Route Academy]** — a leading software training center in Egypt.

# 🛒 E-Commerce Angular Application

A modern, feature-rich e-commerce web application built with Angular 20, showcasing best practices in frontend development with a clean architecture and responsive design.

## 🌟 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes with guards
- Secure session management using cookies

### 🛍️ Product Management
- Browse products with pagination
- Product details with image galleries
- Search and filter functionality
- Product categories and brands
- Rating and review system

### 🛒 Shopping Experience
- Add/remove items to/from cart
- Update item quantities
- Secure checkout process
- Order history and tracking
- Real-time cart updates

### 🎨 User Interface
- Responsive design with TailwindCSS
- Modern UI components with Flowbite
- Interactive carousels and sliders
- Toast notifications for user feedback
- FontAwesome icons
- Smooth animations

## 🛠️ Tech Stack

### Frontend Framework
- **Angular 20** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming

### Styling & UI
- **TailwindCSS 4.1** - Utility-first CSS framework
- **Flowbite** - Component library
- **FontAwesome** - Icon library
- **Angular Animations** - Smooth transitions

### Additional Libraries
- **ngx-owl-carousel-o** - Image carousels and sliders
- **ngx-toastr** - Toast notifications
- **ngx-pagination** - Pagination component
- **ngx-cookie-service** - Cookie management
- **jwt-decode** - JWT token handling

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                 # Core application logic
│   │   ├── guards/          # Route guards (auth, logged-in)
│   │   ├── interfaces/      # TypeScript interfaces
│   │   └── services/        # Business logic services
│   ├── features/            # Feature modules
│   │   └── allorders/       # Order management
│   ├── layouts/             # Layout components
│   │   ├── auth-layout/     # Authentication pages layout
│   │   ├── blank-layout/    # Main application layout
│   │   ├── footer/          # Footer component
│   │   └── navbar/          # Navigation component
│   ├── pages/               # Page components
│   │   ├── home/           # Home page
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout process
│   │   ├── login/          # User login
│   │   ├── register/       # User registration
│   │   ├── products/       # Product listing
│   │   ├── details/        # Product details
│   │   ├── categories/     # Category listing
│   │   ├── brands/         # Brand listing
│   │   └── not-found/      # 404 page
│   └── shared/             # Shared components
│       ├── components/     # Reusable components
│       ├── directives/     # Custom directives
│       └── pipes/          # Custom pipes
├── environments/           # Environment configurations
└── public/                # Static assets
    └── images/            # Application images
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/omar0930/E-Commerce-FinalFrontEndAngularProject.git
   cd E-Commerce-FinalFrontEndAngularProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode for development

## 🔧 Configuration

### Environment Variables
The application uses environment files for configuration:
- `environment.ts` - Production environment
- `environment.development.ts` - Development environment

### API Integration
The application integrates with the RouteM E-commerce API:
- Base URL: `https://ecommerce.routemisr.com/api/v1/`

## 🎯 Key Features Implementation

### Authentication Flow
- JWT token storage in cookies
- Automatic token refresh
- Route protection with guards
- User session persistence

### State Management
- Service-based state management
- Reactive data flow with RxJS
- Local storage for cart persistence

### Responsive Design
- Mobile-first approach
- TailwindCSS utilities
- Flexible grid layouts
- Touch-friendly interactions

## 🧪 Testing

The project includes comprehensive testing setup:
- Unit tests with Jasmine and Karma
- Component testing
- Service testing
- E2E testing capabilities

Run tests:
```bash
npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Omar** - [@omar0930](https://github.com/omar0930)

## 🙏 Acknowledgments

- RouteM for providing the e-commerce API
- Angular team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- All contributors and open-source libraries used in this project

---

⭐ Star this repository if you found it helpful!

