# VIDHI-Legal Aid Web Platform

## Introduction
Many individuals struggle to find verified legal assistance and access essential legal resources, hindering justice and equality. The **Legal Aid Web Platform** addresses this issue by connecting users with pro bono lawyers, providing AI-powered legal guidance, and fostering legal awareness. This initiative aligns with **SDG 16: Peace, Justice, and Strong Institutions**.

### PPT docs: [Google Slides](https://docs.google.com/presentation/d/19GDs6uS6mvNqOYjc0K2XXx-DWMyZsRUg/edit?usp=sharing&ouid=107295220782932447368&rtpof=true&sd=true)

## Features
### User Management & Authentication
- User roles: Clients (legal seekers) and Lawyers (legal providers).
- Secure JWT-based authentication ensuring user data privacy.

### AI-Powered Legal Guidance
- AI chatbot powered by OpenAI's GPT model for initial legal guidance.
- Dynamic response control using temperature parameter adjustments.

### Lawyer Matching & Case Management
- Matching clients with lawyers based on expertise and availability.
- In-app messaging for seamless communication.
- Real-time case progress tracking.

### Community Forum & Knowledge Base
- Forums for general legal discussions and advice.
- Extensive knowledge base with legal FAQs, document templates, and legal articles.

### Real-Time Legal News
- Integration of legal news feeds to keep users informed about recent legal developments.

### Notifications & Updates
- In-app notifications for case status updates and legal news alerts.

### Security & Usability
- Emphasis on user privacy and secure communication.
- User-friendly interface designed with Material-UI (MUI) for accessibility.

## Application Flow
### User Registration & Authentication
- New users sign up and choose their role (Client or Lawyer).
- Secure JWT authentication ensures safe login sessions.

### Legal Guidance & Case Submission
- Clients submit legal questions or case details through a guided form.
- AI Chatbot offers preliminary guidance and categorizes the case.

### Lawyer Matching & Consultation
- System matches clients with suitable pro bono lawyers.
- Lawyers review case details and accept/reject cases.
- In-app messaging allows clients and lawyers to communicate securely.

### Case Management & Updates
- Both clients and lawyers can track case progress.
- Status updates and notifications keep users informed in real time.

### Community Engagement & Resources
- Users participate in community forums for general legal discussions.
- Access to a knowledge base with legal FAQs and document templates.
- Real-time legal news integration keeps users updated.

## Tech Stack
- **Frontend**: Vite + React.js with Material-UI (MUI) for responsive UI.
- **Backend**: FastAPI for efficient API management.
- **Database**: MongoDB for scalable data storage.
- **Authentication**: JWT for secure user sessions.
- **AI Integration**: OpenAI's GPT via Chatbase for legal guidance chatbot.

## Core Modules
- **User Authentication Module**: Secure JWT-based login and role-based access control.
- **AI Chatbot Integration**: OpenAI GPT model integration for legal guidance with temperature control.
- **Lawyer Matching Algorithm**: Efficient lawyer-client matching based on expertise and availability.
- **Case Management System**: Real-time tracking and status updates for case progress.
- **Community Forum & Knowledge Base**: Forum discussions and legal resource management.

## Installation & Setup
### Prerequisites
- Node.js & npm (for frontend)
- Python & pip (for FastAPI backend)
- MongoDB (for database)

### Backend Setup
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## Future Scope
- **Expanded Legal Assistance**: Collaborations with legal firms & aid societies.
- **Advanced AI Capabilities**: Improved NLP & contextual learning.
- **Multi-Language Support**: Catering to diverse users.
- **Enhanced Security**: Compliance with data protection laws like GDPR.
- **Mobile Application Development**: iOS & Android support.

## Impact & Social Relevance
The **Legal Aid Web Platform** bridges the gap between individuals and verified legal assistance, ensuring justice and equality. By leveraging AI and technology, it democratizes access to legal resources, supporting **SDG 16: Peace, Justice, and Strong Institutions**. This project not only showcases technical proficiency but also contributes to social welfare and empowerment.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to enhance the platform.

## Contact
For inquiries or collaboration, contact: **[LifeHackers@gmail.com]**.
