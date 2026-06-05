# 🚦 Smart City Traffic AI

> **AI-powered traffic density analyser — classify traffic as Low, Medium, or High using video/CCTV footage with a Random Forest model.**

🔗 **Live Demo:** [smarts-city-traffic-ai.vercel.app](https://smarts-city-traffic-ai.vercel.app/)

---

## 🧠 About the Project

**Smart City Traffic AI** is an intelligent traffic monitoring system that analyses video or CCTV footage and classifies the traffic density in real time. Instead of manual monitoring, the system uses a trained **Random Forest machine learning model** to automatically detect whether traffic conditions are **Low**, **Medium**, or **High** — helping city planners and traffic authorities make faster, smarter decisions.

---

## 🎯 How It Works

```
📹 Video / CCTV Input
        ↓
🔍 Frame Extraction & Feature Analysis
        ↓
🌲 Random Forest Classification Model
        ↓
🚦 Output: Low | Medium | High Traffic
```

1. **Input** — Upload a video or connect a CCTV feed
2. **Processing** — The system extracts visual features from frames
3. **Classification** — A Random Forest model predicts traffic density
4. **Result** — Displays whether traffic is **Low 🟢**, **Medium 🟡**, or **High 🔴**

---

## ✨ Features

- 📹 **Video Upload Support** — Analyse any traffic video file
- 📡 **CCTV Compatible** — Works with standard CCTV footage
- 🌲 **Random Forest Model** — Reliable, interpretable ML classification
- 🚦 **3-Level Classification** — Low / Medium / High traffic density
- ⚡ **Fast Predictions** — Quick inference on uploaded footage
- 🌐 **Web-Based Interface** — No installation needed, runs in the browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React / Next.js |
| **ML Model** | Random Forest (scikit-learn) |
| **Video Processing** | OpenCV / Python |
| **Deployment** | Vercel |

*(Update if your stack differs)*

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-city-traffic-ai.git

# Navigate into the project
cd smart-city-traffic-ai
```

#### Frontend Setup

```bash
npm install
npm run dev
```

#### Backend / ML Setup

```bash
cd backend   # or model/ — update to your folder name
pip install -r requirements.txt
python app.py
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌲 About the Model

The traffic classifier is built on a **Random Forest** algorithm trained on traffic video frame features.

- **Input Features:** Vehicle count, pixel density, motion vectors, frame contrast *(update to match your actual features)*
- **Output Classes:**
  - 🟢 `Low` — Free-flowing traffic, few vehicles
  - 🟡 `Medium` — Moderate congestion, normal city traffic
  - 🔴 `High` — Heavy congestion, slow-moving or jammed traffic
- **Algorithm:** Random Forest Classifier (ensemble of decision trees)
- **Library:** scikit-learn

---

## 📁 Project Structure

```
smart-city-traffic-ai/
├── public/                 # Static assets
├── src/
│   ├── components/         # React UI components
│   └── pages/              # Next.js pages
├── backend/                # Python ML backend
│   ├── model/              # Trained Random Forest model (.pkl)
│   ├── app.py              # Flask/FastAPI server
│   └── requirements.txt
└── README.md
```

*(Update folder names to match your actual structure)*

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

```
![Dashboard](screenshots/dashboard.png)
![Result](screenshots/result.png)
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact

- 🌐 Live App: [smarts-city-traffic-ai.vercel.app](https://smarts-city-traffic-ai.vercel.app/)
- 📧 Email: ankitsinghjethuri@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/ankit-singh-jethuri/

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built to make cities smarter, one frame at a time 🏙️</p>
