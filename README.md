# 🏥 MediBook - Doctor Appointment Booking Website

A modern, responsive healthcare platform built with React and Tailwind CSS that allows users to search for doctors and hospitals, view profiles, and book appointments with location-based services.

![MediBook Preview](https://via.placeholder.com/800x400?text=MediBook+Preview)

## ✨ Features

### 🔍 **Search & Discovery**
- **Smart Search**: Search doctors by name, specialty, or hospital
- **Location-Based Search**: Find nearby healthcare providers using geolocation
- **Advanced Filters**: Filter by rating, price range, specialty, and availability
- **Real-time Results**: Instant search results with loading states

### 👩‍⚕️ **Doctor & Hospital Profiles**
- **Detailed Profiles**: View doctor qualifications, experience, and specializations
- **Hospital Information**: Browse hospital departments, facilities, and services
- **Patient Reviews**: Read verified patient reviews and ratings
- **Availability Calendar**: Real-time appointment slot availability

### 📅 **Appointment Management**
- **Easy Booking**: Book appointments with preferred date and time slots
- **Patient Dashboard**: Manage all appointments in one place
- **Status Tracking**: Track appointment status (confirmed, pending)
- **Consultation Fees**: Transparent pricing information

### 🎨 **Modern UI/UX**
- **CliniCare Design**: Professional healthcare-focused color scheme
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clean, user-friendly interface
- **Accessibility**: Built with accessibility best practices

### 🌍 **Location Services**
- **GPS Integration**: Automatic location detection
- **Distance Calculation**: Show distances to healthcare providers
- **Nearby Search**: Find doctors and hospitals within specified radius
- **Map Integration Ready**: Prepared for map service integration

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Modern JavaScript library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework

### **UI Components**
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Custom Components** - Reusable, accessible components

### **Location Services**
- **Geolocation API** - Browser-based location detection
- **Distance Calculation** - Haversine formula for accurate distances

### **State Management**
- **React Hooks** - useState, useEffect, custom hooks
- **Local Storage** - Client-side data persistence

## 📂 Project Structure

```
doctor-booking-app/
├── public/                     # Static files
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Header.jsx        # Navigation header
│   │   └── Footer.jsx        # Site footer
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── SearchResults.jsx # Search and filter page
│   │   ├── DoctorProfile.jsx # Doctor details page
│   │   ├── HospitalProfile.jsx # Hospital details page
│   │   ├── BookAppointment.jsx # Booking form page
│   │   ├── Dashboard.jsx     # User dashboard
│   │   └── InvalidPage.jsx   # 404 error page
│   ├── services/             # Business logic
│   │   └── locationService.js # Geolocation utilities
│   ├── data/                 # Mock data
│   │   └── mockData.js       # Sample doctors, hospitals, etc.
│   ├── utils/                # Utility functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles and Tailwind config
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js (v20.19+ or v22.12+)
- npm or yarn package manager

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doctor-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 🎨 Color Scheme

The application uses a professional healthcare color palette inspired by the CliniCare design:

### **Primary Colors (Teal)**
- `#1fc4ae` - Main brand color
- `#1ec2b9` - Secondary brand color
- `#20c3ae` - Base brand color

### **Supporting Colors**
- **Secondary**: Green variants for complementary elements
- **Accent**: Medical blue for links and secondary actions
- **Status Colors**: Success (green), Warning (orange), Danger (red)

## 📱 Responsive Design

- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📋 Features in Detail

### **Home Page**
- Hero section with search functionality
- Featured specialties grid
- Top-rated doctors carousel
- Statistics section
- Call-to-action sections

### **Search Results**
- Advanced filtering sidebar
- Results grid with sorting options
- Filter chips with individual removal
- Loading states and empty states
- Pagination ready

### **Doctor Profile**
- Professional information display
- Rating and reviews section
- Available time slots
- Direct booking integration
- Contact information

### **Appointment Booking**
- Step-by-step booking form
- Date and time selection
- Patient information collection
- Confirmation and payment ready
- Email integration ready

### **User Dashboard**
- Appointment overview cards
- Status tracking
- Quick actions
- Statistics display

## 🌐 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📊 Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Responsive images with proper loading
- **Lazy Loading**: Components loaded on demand
- **Efficient Rendering**: Optimized React rendering patterns

## 🔮 Future Enhancements

### **Phase 1**
- [ ] User authentication and registration
- [ ] Email notifications for appointments
- [ ] Payment gateway integration
- [ ] Real-time chat with doctors

### **Phase 2**
- [ ] Video consultation integration
- [ ] Medical records upload
- [ ] Insurance verification
- [ ] Multi-language support

### **Phase 3**
- [ ] Mobile app development
- [ ] AI-powered doctor recommendations
- [ ] Telemedicine features
- [ ] Analytics dashboard for providers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow the existing code structure and naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test on multiple devices and browsers
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [CliniCare UI Kit](https://www.figma.com/community/file/1350407137722888217/clinicare-medical-health-website-ui-kit) for design inspiration
- [Heroicons](https://heroicons.com/) for beautiful icons
- [Unsplash](https://unsplash.com/) for stock images
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: support@medibook.com
- Check our [FAQ section](docs/FAQ.md)

---

**Made with ❤️ for better healthcare accessibility**
