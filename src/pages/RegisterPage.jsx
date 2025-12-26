
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // أضفنا useNavigate للتوجيه
// import Navbar from "../components/Navbar";

// const RegisterPage = () => {
//     const navigate = useNavigate(); // تعريف دالة التوجيه

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // إدارة معاينة الصور قبل الرفع
//     const [images, setImages] = useState([]);
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).map((file) =>
//                 URL.createObjectURL(file)
//             );
//             setImages((prevImages) => prevImages.concat(filesArray));
//         }
//     };

//     // دالة معالجة الإرسال والتوجيه للوحة التحكم
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // هنا يمكنك إضافة كود إرسال البيانات إلى API مستقبلاً
//         alert("Registration Successful! Redirecting to your dashboard...");
//         navigate("/dashboard/provider"); // سينتقل المستخدم لهذا الرابط بعد الضغط
//     };

//     return (
//         <>
//             <style>{`
//                 :root {
//                     --primary: #8f5cb1;
//                     --primary-light: #f3e5f5;
//                     --primary-dark: #6a1b9a;
//                     --bg-light: #ffffff;
//                     --bg-section-alt: #f9f8fd;
//                     --border-color: #ede7f6;
//                     --text-dark: #2c2c2c;
//                     --text-muted: #666;
//                     --gradient: linear-gradient(90deg, #a770cf 0%, #8f5cb1 100%);
//                     --card-radius: 16px;
//                     --shadow-md: 0 8px 25px rgba(143, 92, 177, 0.1);
//                 }

//                 .register-page { padding: 100px 20px 50px; background-color: var(--bg-section-alt); min-height: 100vh; font-family: 'Poppins', sans-serif; }
//                 .register-card { max-width: 900px; margin: 0 auto; background: var(--bg-light); padding: 2.5rem; border-radius: var(--card-radius); box-shadow: var(--shadow-md); border: 1px solid var(--border-color); }
                
//                 .location-notice { 
//                     background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404;
//                     padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center; font-weight: 600;
//                 }

//                 .register-card h2 { text-align: center; color: var(--primary-dark); font-size: 2.2rem; margin-bottom: 10px; }
//                 .register-subtitle { text-align: center; color: var(--text-muted); margin-bottom: 30px; }
                
//                 .register-form fieldset { border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
//                 .register-form legend { font-weight: 700; color: var(--primary-dark); padding: 0 10px; font-size: 1.1rem; }
//                 .full-width { grid-column: 1 / -1; }
                
//                 .register-form input, .register-form select, .register-form textarea { 
//                     width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ddd; font-size: 0.95rem; outline: none; transition: 0.3s;
//                 }
//                 .register-form input:focus, .register-form textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
                
//                 .checkbox-group { display: flex; flex-wrap: wrap; gap: 15px; grid-column: 1 / -1; }
//                 .checkbox-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
//                 .checkbox-item input { width: auto; }

//                 .preview-container { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
//                 .img-preview { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid var(--primary); }

//                 .submit-btn-container { margin-top: 20px; }
//                 .submit-btn { 
//                     background: var(--gradient); color: white; padding: 15px 50px; border-radius: 50px; 
//                     border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: 0.3s; width: 100%;
//                 }
//                 .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(143, 92, 177, 0.3); }
//                 .back-link { color: var(--primary); font-weight: 600; text-decoration: none; }
//                 .back-link:hover { text-decoration: underline; }

//                 @media (max-width: 768px) { .register-form fieldset { grid-template-columns: 1fr; } }
//             `}</style>

//             <Navbar />
//             <div className="register-page">
//                 <div className="register-card">
//                     <div className="location-notice">
//                         ⚠️ Registration is only available for providers in **Homs and its countryside**.
//                         <br />
//                         التسجيل متاح حالياً فقط لمزودي الخدمة في **حمص وأريافها**.
//                     </div>

//                     <h2>Partner Registration</h2>
//                     <p className="register-subtitle">Fill the form to join our professional network</p>

//                     <form className="register-form" onSubmit={handleSubmit}>
                        
//                         <fieldset>
//                             <legend>Account Info</legend>
//                             <input type="text" placeholder="Owner Name" required />
//                             <input type="text" placeholder="Workshop Name" required />
//                             <input type="email" placeholder="Email Address" required />
//                             <div style={{ display: 'flex', gap: '5px' }}>
//                                 <input type="text" value="+963" readOnly style={{ width: '70px', background: '#f0f0f0' }} />
//                                 <input type="tel" placeholder="9XXXXXXXX" pattern="9[0-9]{8}" required />
//                             </div>
//                             <input className="full-width" type="password" placeholder="Password" required />
//                         </fieldset>

//                         <fieldset>
//                             <legend>Location</legend>
//                             <select className="full-width" required>
//                                 <option value="">Select Region in Homs...</option>
//                                 <option>Homs City</option>
//                                 <option>Al-Rastan</option>
//                                 <option>Talkalakh</option>
//                                 <option>Al-Qusayr</option>
//                             </select>
//                             <input className="full-width" type="text" placeholder="Detailed Address Description" />
//                         </fieldset>

//                         <fieldset>
//                             <legend>Services</legend>
//                             <div className="checkbox-group">
//                                 <label className="checkbox-item"><input type="checkbox" /> Mechanics</label>
//                                 <label className="checkbox-item"><input type="checkbox" /> Electrical</label>
//                                 <label className="checkbox-item"><input type="checkbox" /> Towing</label>
//                                 <label className="checkbox-item"><input type="checkbox" /> Fuel</label>
//                             </div>
//                             <textarea className="full-width" placeholder="Service list and approximate prices..."></textarea>
//                         </fieldset>

//                         <fieldset>
//                             <legend>Documents & Gallery</legend>
//                             <div className="full-width">
//                                 <label style={{ fontSize: '0.85rem', color: 'var(--primary-dark)' }}>Workshop Logo:</label>
//                                 <input type="file" accept="image/*" />
//                             </div>
//                             <div className="full-width">
//                                 <label style={{ fontSize: '0.85rem', color: 'var(--primary-dark)' }}>License / Commercial Register:</label>
//                                 <input type="file" multiple />
//                             </div>
//                             <div className="full-width">
//                                 <label style={{ fontSize: '0.85rem', color: 'var(--primary-dark)' }}>Work Photos:</label>
//                                 <input type="file" multiple accept="image/*" onChange={handleImageChange} />
//                                 <div className="preview-container">
//                                     {images.map((src, index) => (
//                                         <img key={index} src={src} className="img-preview" alt="preview" />
//                                     ))}
//                                 </div>
//                             </div>
//                         </fieldset>

//                         <fieldset>
//                             <legend>Additional Info</legend>
//                             <input type="number" placeholder="Years of Experience" min="1" max="50" />
//                             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', gridColumn: '1/-1' }}>
//                                 <label>Work Hours: From</label>
//                                 <input type="time" style={{width: 'auto'}} />
//                                 <label>To</label>
//                                 <input type="time" style={{width: 'auto'}} />
//                             </div>
//                             <textarea className="full-width" rows="4" placeholder="Brief about your workshop..."></textarea>
//                         </fieldset>

//                         <div className="submit-btn-container">
//                             <button className="submit-btn" type="submit">SUBMIT REGISTRATION</button>
//                         </div>

//                         <div style={{ marginTop: 20, textAlign: 'center' }}>
//                             <Link to="/" className="back-link">← Back to Home</Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default RegisterPage;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prev) => prev.concat(filesArray));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t("register.success"));
        navigate("/dashboard/provider");
    };

    return (
        <>
                    <style>{`
                 :root {
                     --primary: #8f5cb1;
                     --primary-light: #f3e5f5;
                     --primary-dark: #6a1b9a;
                     --bg-light: #ffffff;
                     --bg-section-alt: #f9f8fd;
                     --border-color: #ede7f6;
                     --text-dark: #2c2c2c;
                     --text-muted: #666;
                     --gradient: linear-gradient(90deg, #a770cf 0%, #8f5cb1 100%);
                     --card-radius: 16px;
                    --shadow-md: 0 8px 25px rgba(143, 92, 177, 0.1);
                 }

                 .register-page { padding: 100px 20px 50px; background-color: var(--bg-section-alt); min-height: 100vh; font-family: 'Poppins', sans-serif; }
                 .register-card { max-width: 900px; margin: 0 auto; background: var(--bg-light); padding: 2.5rem; border-radius: var(--card-radius); box-shadow: var(--shadow-md); border: 1px solid var(--border-color); }
                
                 .location-notice { 
                     background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404;
                     padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center; font-weight: 600;
                 }

                 .register-card h2 { text-align: center; color: var(--primary-dark); font-size: 2.2rem; margin-bottom: 10px; }
                 .register-subtitle { text-align: center; color: var(--text-muted); margin-bottom: 30px; }
                
                 .register-form fieldset { border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                 .register-form legend { font-weight: 700; color: var(--primary-dark); padding: 0 10px; font-size: 1.1rem; }
                 .full-width { grid-column: 1 / -1; }
                
                 .register-form input, .register-form select, .register-form textarea { 
                     width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ddd; font-size: 0.95rem; outline: none; transition: 0.3s;
                 }
                 .register-form input:focus, .register-form textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
                
                .checkbox-group { display: flex; flex-wrap: wrap; gap: 15px; grid-column: 1 / -1; }
                .checkbox-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
                .checkbox-item input { width: auto; }

                 .preview-container { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
                 .img-preview { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid var(--primary); }

                .submit-btn-container { margin-top: 20px; }
                 .submit-btn { 
                     background: var(--gradient); color: white; padding: 15px 50px; border-radius: 50px; 
                     border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: 0.3s; width: 100%;
                 }
                 .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(143, 92, 177, 0.3); }
                .back-link { color: var(--primary); font-weight: 600; text-decoration: none; }
                .back-link:hover { text-decoration: underline; }

                 @media (max-width: 768px) { .register-form fieldset { grid-template-columns: 1fr; } }
            `}</style>
            <Navbar />

            <div className="register-page">
                <div className="register-card">

                    {/* 🔔 NOTICE */}
                    <div className="location-notice">
                        ⚠️ {t("register.notice")}
                    </div>

                    <h2>{t("register.title")}</h2>
                    <p className="register-subtitle">{t("register.subtitle")}</p>

                    <form className="register-form" onSubmit={handleSubmit}>

                        {/* ACCOUNT INFO */}
                        <fieldset>
                            <legend>{t("register.account_info")}</legend>

                            <input
                                type="text"
                                placeholder={t("register.owner_name")}
                                required
                            />
                            <input
                                type="text"
                                placeholder={t("register.workshop_name")}
                                required
                            />
                            <input
                                type="email"
                                placeholder={t("register.email")}
                                required
                            />

                            <div style={{ display: "flex", gap: "5px" }}>
                                <input
                                    type="text"
                                    value="+963"
                                    readOnly
                                    style={{ width: "70px", background: "#f0f0f0" }}
                                />
                                <input
                                    type="tel"
                                    placeholder={t("register.phone")}
                                    pattern="9[0-9]{8}"
                                    required
                                />
                            </div>

                            <input
                                className="full-width"
                                type="password"
                                placeholder={t("register.password")}
                                required
                            />
                        </fieldset>

                        {/* LOCATION */}
                        <fieldset>
                            <legend>{t("register.location")}</legend>

                            <select className="full-width" required>
                                <option value="">{t("register.select_region")}</option>
                                <option>{t("register.homs_city")}</option>
                                <option>{t("register.rastan")}</option>
                                <option>{t("register.talkalakh")}</option>
                                <option>{t("register.qusayr")}</option>
                            </select>

                            <input
                                className="full-width"
                                type="text"
                                placeholder={t("register.address")}
                            />
                        </fieldset>

                        {/* SERVICES */}
                        <fieldset>
                            <legend>{t("register.services")}</legend>

                            <div className="checkbox-group">
                                <label className="checkbox-item">
                                    <input type="checkbox" /> {t("register.mechanics")}
                                </label>
                                <label className="checkbox-item">
                                    <input type="checkbox" /> {t("register.electrical")}
                                </label>
                                <label className="checkbox-item">
                                    <input type="checkbox" /> {t("register.towing")}
                                </label>
                                <label className="checkbox-item">
                                    <input type="checkbox" /> {t("register.fuel")}
                                </label>
                            </div>

                            <textarea
                                className="full-width"
                                placeholder={t("register.service_desc")}
                            />
                        </fieldset>

                        {/* DOCUMENTS */}
                        <fieldset>
                            <legend>{t("register.documents")}</legend>

                            <div className="full-width">
                                <label>{t("register.logo")}</label>
                                <input type="file" accept="image/*" />
                            </div>

                            <div className="full-width">
                                <label>{t("register.license")}</label>
                                <input type="file" multiple />
                            </div>

                            <div className="full-width">
                                <label>{t("register.photos")}</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                                <div className="preview-container">
                                    {images.map((src, i) => (
                                        <img key={i} src={src} className="img-preview" alt="preview" />
                                    ))}
                                </div>
                            </div>
                        </fieldset>

                        {/* ADDITIONAL */}
                        <fieldset>
                            <legend>{t("register.additional")}</legend>

                            <input
                                type="number"
                                placeholder={t("register.experience")}
                                min="1"
                                max="50"
                            />

                            <div style={{ display: "flex", gap: "10px", alignItems: "center", gridColumn: "1/-1" }}>
                                <label>{t("register.from")}</label>
                                <input type="time" />
                                <label>{t("register.to")}</label>
                                <input type="time" />
                            </div>

                            <textarea
                                className="full-width"
                                rows="4"
                                placeholder={t("register.about")}
                            />
                        </fieldset>

                        <button className="submit-btn" type="submit">
                            {t("register.submit")}
                        </button>

                        <div style={{ marginTop: 20, textAlign: "center" }}>
                            <Link to="/" className="back-link">
                                ← {t("register.back")}
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
