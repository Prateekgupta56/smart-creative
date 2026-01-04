import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Stage, Layer, Image as KonvaImage, Rect, Text } from 'react-konva';
import useImage from 'use-image';
import { Camera, Sparkles, CheckCircle, AlertTriangle, Download, RefreshCw, Smartphone } from 'lucide-react';
import './App.css';

// 👇 YOUR NGROK URL
const API_URL = "https://royce-capable-implicatively.ngrok-free.dev";

const URLImage = ({ src, x, y }) => {
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} width={180} height={180} draggable />;
};

export default function App() {
  const [packshot, setPackshot] = useState(null);
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("summer");
  
  const stageRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setValidation(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/api/assets/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPackshot(`${API_URL}${res.data.url}`);
    } catch (err) {
      alert("Error: Backend might be offline. Check Colab!");
    }
    setLoading(false);
  };

  const checkCompliance = async () => {
    const mockData = { objects: packshot ? [{ name: 'logo' }] : [] };
    try {
      const res = await axios.post(`${API_URL}/api/validate`, mockData);
      setValidation(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = `tesco_ad_${theme}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand">
          <Smartphone size={22} />
          <span>SmartCreative</span>
        </div>
        <div className="user-badge">Tesco UK</div>
      </header>

      <main className="content">
        
        {!packshot && (
          <div className="hero-card">
            <div className="upload-circle">
              <input type="file" onChange={handleUpload} accept="image/*" />
              <Camera size={40} color="#00539F" />
            </div>
            <h3>Tap to Create Ad</h3>
            <p>AI will remove the background instantly.</p>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <RefreshCw className="spin" size={40} color="#00539F" />
            <p>✨ AI is generating assets...</p>
          </div>
        )}

        {packshot && !loading && (
          <>
            {/* LEFT COLUMN: Canvas */}
            <div className="canvas-card">
              <div className="canvas-header">
                <span className="label">Live Preview</span>
                <div className="theme-toggles">
                  <button onClick={() => setTheme('summer')} className={theme === 'summer' ? 'active' : ''}>☀️</button>
                  <button onClick={() => setTheme('winter')} className={theme === 'winter' ? 'active' : ''}>❄️</button>
                </div>
              </div>

              <div className="stage-wrapper">
                <Stage width={300} height={300} ref={stageRef}>
                  <Layer>
                    <Rect 
                      x={0} y={0} width={300} height={300} 
                      fill={theme === 'summer' ? '#FEF3C7' : '#DBEAFE'} 
                    />
                    <Text 
                      text={theme === 'summer' ? "SUMMER SALE" : "WINTER DEALS"} 
                      x={20} y={20} fontSize={24} fontStyle="bold" fill="#00539F" opacity={0.3}
                    />
                    <URLImage src={packshot} x={60} y={60} />
                  </Layer>
                </Stage>
              </div>
              <p className="hint">👆 Drag the product to position it</p>
            </div>

            {/* RIGHT COLUMN: Controls (Desktop) or Bottom (Mobile) */}
            <div className="controls-area">
              <div className="action-grid">
                <button className="btn btn-primary" onClick={checkCompliance}>
                  <Sparkles size={18} /> Run Compliance
                </button>
                <button className="btn btn-outline" onClick={handleExport}>
                  <Download size={18} /> Export
                </button>
              </div>

              {validation && (
                <div className={`validation-sheet ${validation.status}`}>
                  <div className="sheet-header">
                    {validation.status === 'pass' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                    <h4>{validation.status === 'pass' ? "Tesco Compliant" : "Issues Detected"}</h4>
                  </div>
                  {validation.errors.map((err, i) => (
                     <p key={i} className="err-msg">• {err}</p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}