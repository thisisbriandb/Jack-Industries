'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: formData.email,
          name: formData.name,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gray-900/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="font-oswald text-5xl font-bold mb-4">Contactez-nous</h1>
              <p className="font-work-sans text-xl">Nous sommes à votre écoute</p>
            </motion.div>
          </div>
        </section>

        {/* Informations de contact et formulaire */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-oswald font-bold mb-6">Restons en contact</h2>
                  <p className="text-gray-600 font-work-sans">
                    N'hésitez pas à nous contacter pour toute question ou demande de devis. 
                    Notre équipe est à votre disposition pour vous accompagner.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <FaPhone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-oswald font-semibold text-lg">Téléphone</h3>
                      <p className="text-gray-600 font-work-sans">+212 5 22 48 25 40</p>
                      <p className="text-gray-600 font-work-sans">+212 6 16 96 65 09</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <FaEnvelope className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-oswald font-semibold text-lg">Email</h3>
                      <p className="text-gray-600 font-work-sans">jackindustries.maroc@gmail.com</p>
                      <p className="text-gray-600 font-work-sans">info@jackindustries.ma</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <FaMapMarkerAlt className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-oswald font-semibold text-lg">Adresse</h3>
                      <p className="text-gray-600 font-work-sans">
                        Zone Industrielle, Rue 123<br />
                        Casablanca, Maroc
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-work-sans text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-work-sans"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-work-sans text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-work-sans"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-work-sans text-gray-700 mb-2">Sujet</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-work-sans"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-work-sans text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-work-sans resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full bg-primary text-white font-oswald text-lg py-4 rounded-lg hover:bg-primary/90 transition-colors ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                  </motion.button>
                </form>

                {status === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl">
                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl">
                    Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Carte Google Maps */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-lg h-[500px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.327679026318!2d-7.647896225866539!3d33.59680144164436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2fa5e0175db%3A0x610a949c03c70d15!2sJack%20Industries!5e0!3m2!1sfr!2sma!4v1695821347322!5m2!1sfr!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
