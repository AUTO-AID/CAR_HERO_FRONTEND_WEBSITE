import React from 'react';
import { teamData } from '@/contacts';
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';

const TeamSection = () => {
    const { t } = useTranslation();

    return (
        <section id="team" className="section">
            <div className="app-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title">{t("team1.title")}</h2>
                    <p className="section-subtitle"><b>{t("team1.subtitle")}</b></p>
                </motion.div>

                <div className="team-container">
                    {teamData.map((member, index) => (
                        <motion.div
                            key={index}
                            className="team-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="team-img-wrap">
                                <img src={member.img} alt={t(member.name)} />
                            </div>

                            <h4>{t(member.name)}</h4>
                            <p className="role">{t(member.role)}</p>
                            <p className="desc">{t(member.desc)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
