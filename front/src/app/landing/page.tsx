"use client"

import Button from "@/components/Ui/button"
import { H1 } from "@/components/Ui/typography";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Landing () {

    return (

    <div className="absolute inset-0 bg-[url('/landing.png')] bg-cover bg-center -z-10">
  {/* Overlay con token por tema */}
  <div className="absolute inset-0 bg-[var(--hero-overlay)]" />
       {/* Contenido */}
  <div className="relative z-10 h-full flex items-center justify-center px-6">
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Texto a la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center md:justify-start text-center md:text-left"
          >
            <H1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              Lo mejor para vos, en BairesTech hoy!
            </H1>
          </motion.div>

          {/* Botones a la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col items-center md:items-end justify-center gap-4"
          >
            <Button
              href="/login"
              variant="primary"
              size="md"
              minWidth="220px"
              icon={<FaUser />}
              iconPosition="right"
            >
              Iniciar sesión
            </Button>

            <Button
              href="/register"
              variant="primary"
              size="md"
              minWidth="220px"
              icon={<FaUserPlus />}
              iconPosition="right"
            >
              Registrarse
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
    )
}