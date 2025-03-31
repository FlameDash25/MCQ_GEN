MCQ Generator using AI - Auto Create Questions from Text Files (Flask Web App)

Welcome to the MCQ Generator project! This Flask web app allows you to automatically generate multiple-choice questions (MCQs) from text files (PDF, DOCX, or TXT) using Google Generative AI. The app extracts text from uploaded files, processes it with AI, and generates MCQs that can be downloaded in both text and PDF formats. Perfect for educators, students, and developers!

Features
File Upload: Upload PDF, DOCX, or TXT files.

AI-Powered MCQ Generation: Uses Google Generative AI to create MCQs from the uploaded content.

Customizable Difficulty Levels: Choose from Easy, Medium, or Hard difficulty for the generated questions.

Page Range Selection: Specify a start and end page for PDF and DOCX files to focus on specific sections.

Preview Uploaded Document: Preview the content of the uploaded file before generating MCQs.

Download MCQs: Download the generated MCQs in text or PDF format.

Responsive Design: Works seamlessly on desktop and mobile devices.

Demo
MCQ Generator Demo

Technologies Used
Flask: A lightweight Python web framework for building the app.

Google Generative AI API: Powers the MCQ generation using advanced AI models.

PDF.js: Extracts text and images from PDF files.

Mammoth.js: Extracts text from DOCX files.

FPDF: Generates downloadable PDFs for the MCQs.

Bootstrap Icons: For UI icons and design.

HTML/CSS/JavaScript: For the frontend interface.

Installation
Prerequisites
Python 3.8 or higher

Google API Key (for Google Generative AI)

Flask

Required Python libraries (listed in requirements.txt)

Steps
Clone the Repository:

bash
Copy
git clone https://github.com/your-username/MCQ-Generator-using-AI.git
cd MCQ-Generator-using-AI
Set Up a Virtual Environment:

bash
Copy
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Dependencies:

bash
Copy
pip install -r requirements.txt
Set Up Google API Key:

Obtain a Google API key from the Google Cloud Console.

Add the API key to the .env file:

env
Copy
GOOGLE_API_KEY=your_api_key_here
Run the Flask App:

bash
Copy
python app.py
Access the App:
Open your browser and navigate to http://127.0.0.1:5000.

Usage
Upload a File:

Click the "Choose File" button to upload a PDF, DOCX, or TXT file.

The app will display a preview of the uploaded document.

Set Parameters:

Enter the number of questions you want to generate.

Select the difficulty level (Easy, Medium, or Hard).

Optionally, specify a start and end page for PDF and DOCX files.

Generate MCQs:

Click the "Generate MCQs" button.

The app will process the file using Google Generative AI and display the generated MCQs.

Download MCQs:

Download the MCQs in text or PDF format using the provided links.

File Handling
The app supports the following file formats:

PDF: Extracts text and images using pdfjs and pdfplumber.

DOCX: Extracts text using mammoth and python-docx.

TXT: Directly processes plain text files.

API Integration
The app integrates with the Google Generative AI API to generate MCQs. The API is configured to analyze the uploaded content and create questions based on the selected difficulty level.

Folder Structure
Copy
MCQ-Generator-using-AI/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── static/
│   ├── styles.css          # Custom CSS
│   └── script.js           # JavaScript for frontend functionality
├── templates/
│   ├── index.html          # Main page
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   └── results.html        # Results page
├── uploads/                # Folder for uploaded files
├── results/                # Folder for generated MCQs
└── README.md               # Project documentation
Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Google Generative AI: For providing the AI models used in MCQ generation.

Flask: For making web app development simple and efficient.

PDF.js, Mammoth.js, and FPDF: For file handling and PDF generation.

Contact
For questions or feedback, feel free to reach out:

Velson: Instagram

Prasanna: Instagram

Omkar: Instagram

Sanal: Instagram

Happy MCQ Generation! 🚀
