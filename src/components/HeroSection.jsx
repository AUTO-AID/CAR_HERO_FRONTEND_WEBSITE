// import React from "react";
// import { Box, Button, Typography, Container } from "@mui/material";
// import { motion } from "framer-motion";
// import AndroidIcon from "@mui/icons-material/Android";
// import roadBg from "../assets/header-bg.jpg";

// const HeroSection = () => {
//   return (
//     <Box
//     id="home" 
//       sx={{
//             // width: "100vw",
//        maxWidth: "100%",
//         backgroundImage: `linear-gradient(to right, #B57EDC, #111111), url(${roadBg})`,
//         backgroundBlendMode: "overlay",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         color: "#ffffff",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         position: "relative",
//         overflow: "hidden",
//         padding: { xs: "60px 0", md: 0 },
//       }}
//     >
//       <Container
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "center", md: "center" },
//           gap: 5,
//           zIndex: 2,
//           textAlign: { xs: "center", md: "left" },
//         }}
//       >
//         {/* Text Section */}
//         <Box sx={{ maxWidth: 600 }}>
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 color: "#ffffff",
//                 fontSize: { xs: "34px", sm: "40px", md: "64px" },
//                 lineHeight: { xs: "45px", sm: "55px", md: "85px" },
//                 fontWeight: 700,
//               }}
//             >
//               Your assistance <br /> when you are <br /> on the Road
//             </Typography>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: { xs: "center", md: "flex-start" },
//                 gap: 2,
//                 mt: 5,
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 startIcon={<AndroidIcon sx={{ fontSize: 26 }} />}
//                 sx={{
//                   padding: { xs: "12px 30px", md: "14px 40px" },
//                   color: "#fff",
//                   textTransform: "uppercase",
//                   letterSpacing: "1.5px",
//                   borderColor: "#fff",
//                   borderWidth: "2px",
//                   borderRadius: "30px",
//                   fontWeight: 500,
//                   fontSize: { xs: "14px", md: "16px" },
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: "#fff",
//                     color: "#B57EDC",
//                     borderColor: "#fff",
//                   },
//                 }}
//               >
//                 Download
//               </Button>
//             </Box>
//           </motion.div>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HeroSection;
import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import AndroidIcon from "@mui/icons-material/Android";
import roadBg from "../assets/header-bg.jpg";
import sideImg from "../assets/hero-pg.png";
import backImg from "../assets/hero-pg2.png";
import { useTranslation } from "react-i18next"; 

const HeroSection = () => {
  const { t } = useTranslation(); 

  return (
    <Box
      id="home"
      sx={{
        maxWidth: "100%",
        backgroundImage: `linear-gradient(to right, var(--primary), var(--bg-light)), url(${roadBg})`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "var(--text-light)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: { xs: "60px 0", md: 0 },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
          zIndex: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* TEXT */}
        <Box sx={{ maxWidth: 600 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "inherit",
                fontSize: { xs: "34px", sm: "40px", md: "64px" },
                lineHeight: { xs: "45px", sm: "55px", md: "85px" },
                fontWeight: 700,
              }}
            >
              {t("hero.title.line1")} <br />
              {t("hero.title.line2")} <br />
              {t("hero.title.line3")}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                mt: 5,
              }}
            >
              <Button
                variant="contained"
                startIcon={<AndroidIcon sx={{ fontSize: 26 }} />}
                sx={{
                  padding: { xs: "14px 32px", md: "16px 40px" },
                  background: "var(--gradient)",
                  color: "var(--text-light)",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: { xs: "15px", md: "17px" },
                  boxShadow: "0 8px 24px rgba(143, 92, 177, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: "var(--gradient)",
                    transform: "translateY(-4px) scale(1.02)",
                    boxShadow: "0 12px 32px rgba(143, 92, 177, 0.5)",
                  },
                  "&:active": {
                    transform: "translateY(-2px) scale(1)",
                  },
                }}
              >
                {t("hero.download")}
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* IMAGES */}
        <Box
          sx={{
            position: "relative",
            width: "420px",
            height: "500px",
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          {/* Back Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: [0, -20, 0] // Floating effect
            }}
            transition={{ 
              opacity: { duration: 1 },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          >
            <Box
              component="img"
              src={backImg}
              alt="Hero Back Phone"
              sx={{
                position: "absolute",
                top: "40px",
                left: "40px",
                width: "70%",
                opacity: 0.7,
                transform: "rotate(-5deg)",
                filter: "blur(1px)",
              }}
            />
          </motion.div>

          {/* Front Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: [0, -15, 0] // Floating effect
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.2 },
              y: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2
              }
            }}
          >
            <Box
              component="img"
              src={sideImg}
              alt="Hero Front Phone"
              sx={{
                position: "absolute",
                top: 0,
                left: "100px",
                width: "85%",
                zIndex: 2,
                transform: "rotate(2deg)",
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;

