import React from 'react';
import { teamData } from '../contacts';
import { useTranslation } from "react-i18next";

const TeamSection = () => {
    const { t } = useTranslation();

    return (
        <section id="team" className="section">
            <div className="app-container">
                <h2 className="section-title">{t("team1.title")}</h2>
                <p className="section-subtitle"><b>{t("team1.subtitle")}</b></p>

                <div className="team-container">
                    {teamData.map((member, index) => (
                        <div className="team-card" key={index}>
                            <div className="team-img-wrap">
                                <img src={member.img} alt={t(member.name)} />
                            </div>

                            <h4>{t(member.name)}</h4>
                            <p className="role">{t(member.role)}</p>
                            <p className="desc">{t(member.desc)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
