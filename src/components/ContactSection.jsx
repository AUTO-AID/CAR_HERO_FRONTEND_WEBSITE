// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { faqData } from '../contacts';
// import { LoginIcon, DollarSignIcon, CalendarIcon } from './icons';


// const ContactSection = () => {
//     const [activeQuestion, setActiveQuestion] = useState(null);
//     const navigate = useNavigate();

//     const toggleQuestion = (index) => {
//         setActiveQuestion((prev) => (prev === index ? null : index));
//     };
    
//     const partnerCards = [
//         {
//             icon: <LoginIcon />,
//             title: 'Sign-on with the App',
//             desc: 'Download the app from google storeWe suggest Android 7" tablet with SMS feature for best use of appReceive emergency service notifications within your region Never pay for parts up-front: place order under your name and we handle payment after approval'
//         },
//         {
//             icon: <DollarSignIcon />,
//             title: 'Make more money!',
//             desc: 'If you own a Garage, Spare parts shop, Car Insurance Agent, Accident assessor you can partner with CarHero Valid Driver license, PAN No and Aadhaar cardValid business account accepting digital transactions File taxes regularly Nominal startup investment'
//         },
//         {
//             icon: <CalendarIcon />,
//             title: 'Choose your schedule',
//             desc: ' Member to Member Serviceyou are the boss of your own You pick up service calls based on your time and convenience. Attend calls once accepted. Ratings matter! give imporance to customer ratings on each contractors that work with our customer Close all communication with customers and get payment settlement at the end of week .'
//         }
//     ];

//     return (
//         <section id="contact" className="section">
//             <div className="app-container">
//                 <h2 className="section-title" > Contact Us</h2>
//                 <p className="section-subtitle"><b>Have questions or want to partner with us? Reach out!</b></p>
                
//                 <div className="contact-grid">
//                     <div className="faq">
//                         <h3>Frequently Asked Questions</h3>
//                         {faqData.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
//                                 onClick={() => toggleQuestion(index)}
//                                 role="button"
//                                 aria-expanded={activeQuestion === index}
//                                 tabIndex={0}
//                                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleQuestion(index); }}
//                             >
//                                 <div className="faq-row">
//                                     <div className="faq-question">{item.q}</div>
//                                     <div className="faq-toggle">+</div>
//                                 </div>
//                                 <div className="faq-answer-wrapper">
//                                     <p className="faq-answer">{item.a}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="contact-form-container">
//                         <h3>Send Us a Message</h3>
//                         <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
//                             <input type="text" placeholder="Full Name" required />
//                             <input type="email" placeholder="Email" required />
//                             <textarea placeholder="Your Message" rows={4} required></textarea>
//                             <button type="submit" className="form-submit-btn">Send Message</button>
//                         </form>
//                     </div>
//                 </div>

//                 <div className="partner-section">
//                     <h2 className="section-title">Become a Service Partner</h2>
//                      <div className="partner-cards">
//                         {partnerCards.map((card, index) => (
//                            <div className="partner-card" key={index}>
//                                 <div className="card-icon">{card.icon}</div>
//                                 <h4>{card.title}</h4>
//                                 <p>{card.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <button className="register-btn" onClick={() => navigate("/register")}>
//                         Click to Register
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ContactSection;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LoginIcon, DollarSignIcon, CalendarIcon } from './icons';

const ContactSection = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const faqData = t("contact_faq", { returnObjects: true });
    const partnerCards = t("partner_cards", { returnObjects: true });

    const toggleQuestion = (index) => {
        setActiveQuestion((prev) => (prev === index ? null : index));
    };

    return (
        <section id="contact" className="section">
            <div className="app-container">
                
                <h2 className="section-title">{t("contact1.title")}</h2>
                <p className="section-subtitle"><b>{t("contact1.subtitle")}</b></p>

                <div className="contact-grid">
                    
                    {/* FAQ */}
                    <div className="faq">
                        <h3>{t("contact1.faq_title")}</h3>

                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
                                onClick={() => toggleQuestion(index)}
                            >
                                <div className="faq-row">
                                    <div className="faq-question">{item.q}</div>
                                    <div className="faq-toggle">+</div>
                                </div>
                                <div className="faq-answer-wrapper">
                                    <p className="faq-answer">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-container">
                        <h3>{t("contact1.send_message")}</h3>

                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder={t("contact1.full_name")} required />
                            <input type="email" placeholder={t("contact1.email")} required />
                            <textarea placeholder={t("contact1.message")} rows={4} required></textarea>
                            <button type="submit" className="form-submit-btn">
                                {t("contact1.submit_btn")}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Partner Section */}
                <div className="partner-section">
                    <h2 className="section-title">{t("contact1.partner_title")}</h2>

                    <div className="partner-cards">
                        {partnerCards.map((card, index) => (
                            <div className="partner-card" key={index}>
                                <div className="card-icon">
                                    {index === 0 && <LoginIcon />}
                                    {index === 1 && <DollarSignIcon />}
                                    {index === 2 && <CalendarIcon />}
                                </div>
                                <h4>{card.title}</h4>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button className="register-btn" onClick={() => navigate("/register")}>
                        {t("contact1.register_btn")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
