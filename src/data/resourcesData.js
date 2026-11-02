/**
 * Manuales internos y presentaciones de consulta.
 * Los enlaces abren el material original alojado en Canva.
 */
export const RESOURCE_LINKS = {
  dressCode: 'https://canva.link/2w3996snqcpdqsv',
  financeControl: 'https://canva.link/ngojz0qyqwxfbeq',
};

export const DRESS_CODE = {
  title: 'Código de vestimenta',
  subtitle: 'Lineamientos para el equipo administrativo y técnico.',
  pages: '8 páginas',
  tags: ['Imagen personal', 'Seguridad', 'Higiene', 'Dotación'],
  objective:
    'Establecer pautas claras sobre la vestimenta, la imagen personal y la seguridad dentro de la empresa.',
  objectiveNote:
    'Promovemos una imagen profesional y protegemos la integridad del equipo técnico.',
  sections: [
    {
      id: 'admin',
      label: 'Administrativa y ventas',
      title: 'Casual-elegante',
      groups: [
        {
          label: 'Mujeres',
          items: [
            'Blusas, camisas, camisetas tipo polo y camisas sin mangas en tonos neutros.',
            'Pantalón de vestir, tipo chino o jeans sin roturas ni desgaste.',
            'Faldas a la rodilla o vestidos de corte casual formal.',
            'Calzado cerrado, baletas o calzado cómodo de vestir.',
          ],
        },
        {
          label: 'Hombres',
          items: [
            'Camisas manga corta o larga, camisetas tipo polo o sacos livianos.',
            'Pantalones de vestir, chinos o jeans oscuros sin desgastes.',
            'Zapatos: mocasines o tenis casuales limpios; también zapatos deportivos.',
          ],
        },
      ],
    },
    {
      id: 'technical',
      label: 'Equipo técnico',
      title: 'Dotación operativa',
      items: [
        'Concepto: vestimenta funcional, uniforme y adaptada a la comodidad laboral.',
        'Camiseta: polo asignada, manga corta y colores corporativos.',
        'Pantalón: operativo o técnico, resistente y con bolsillos funcionales.',
        'Calzado de seguridad: botas de trabajo con puntera dieléctrica (aislante) para manipular equipos electrónicos.',
      ],
      note:
        'El uniforme técnico está diseñado para facilitar el trabajo diario, mantener una imagen consistente y reducir riesgos durante la manipulación de equipos.',
    },
    {
      id: 'not-allowed',
      label: 'Para todo el personal',
      title: 'Ropa no permitida',
      items: [
        'Escotes pronunciados o espaldas totalmente descubiertas.',
        'Ropa con transparencias, encajes expuestos o encajes lenceros.',
        'Ropa corta: shorts, bermudas o faldas muy por encima de la rodilla.',
        'Prendas deshilachadas o rotas.',
      ],
    },
    {
      id: 'hygiene',
      label: 'Cuidado personal',
      title: 'Higiene y presentación',
      groups: [
        {
          label: 'Mujeres',
          items: [
            'Cabello: limpio y peinado. En el área técnica debe llevarse recogido en coleta o moño para evitar interferencias en la reparación. En el área administrativa no es obligatorio recogerlo, pero debe mantenerse limpio y presentable.',
            'Uñas: cortas o de longitud moderada (máximo 2), limpias. En el área técnica, sin apliques ni accesorios que limiten la precisión al manipular piezas pequeñas.',
            'Accesorios: maquillaje sobrio o natural. En el área técnica, evitar cadenas largas, pulseras o anillos durante la interacción con tarjetas electrónicas.',
          ],
        },
        {
          label: 'Hombres',
          items: [
            'Cabello: limpio, peinado y bien presentado.',
            'Barba y bigote: afeitado completo o barba y bigote bien perfilados y recortados.',
            'Uñas: cortas y totalmente limpias; vital para el ensamble de tornillería y flex de teléfonos.',
            'Accesorios: uso moderado. En el área técnica está prohibido el uso de anillos, relojes metálicos o pulseras durante la manipulación de hardware.',
          ],
        },
      ],
    },
    {
      id: 'care',
      label: 'Dotación',
      title: 'Cuidados de las prendas',
      steps: [
        {
          number: '01',
          title: 'Lavar',
          text: 'Lava las prendas con agua fría y detergente suave. Seca a la sombra para proteger el color y mantén el calzado limpio y libre de residuos.',
        },
        {
          number: '02',
          title: 'Revisar',
          text: 'Mantén las prendas limpias, en buen estado y con una presentación adecuada, procurando su cuidado y conservación.',
        },
        {
          number: '03',
          title: 'Solicitar',
          text: 'Solicita por escrito el cambio de la dotación si presenta desgaste, deterioro o defectos de calidad, especialmente si aún no corresponde la entrega de una nueva dotación.',
        },
      ],
    },
  ],
};

export const FINANCE_CONTROL = {
  title: 'Finanzas y control',
  subtitle: 'Presentación de las áreas que sostienen la operación de Mr. Fix-it.',
  pages: '6 páginas',
  tags: ['Punto de venta', 'Área técnica', 'Administración', 'Bienestar'],
  sections: [
    {
      id: 'sales',
      label: 'Punto de venta',
      title: 'Atención al cliente',
      items: [
        'Atención personalizada.',
        'Confianza y servicio.',
        'Accesorios y dispositivos originales.',
      ],
    },
    {
      id: 'technical',
      label: 'Área técnica',
      title: 'Mantenimiento y precisión',
      items: [
        'Equipos de precisión para diagnósticos exactos.',
        'Estación de soldadura para reparaciones confiables con procesos seguros y eficientes.',
        'Herramientas especializadas y organización y calidad para cada reparación.',
      ],
    },
    {
      id: 'admin',
      label: 'Área administrativa',
      title: 'Procesos que sostienen el taller',
      items: [
        'Gestión humana.',
        'Seguridad y salud en el trabajo.',
        'Finanzas y control.',
      ],
      note:
        'Un equipo que gestiona y cuida los procesos para apoyar el trabajo del equipo y el de los clientes.',
    },
    {
      id: 'wellbeing',
      label: 'Bienestar',
      title: 'Zona de bienestar y comunes',
      items: [
        'Espacio para relajarse y recargar energía.',
        'Ambiente pensado para la comodidad del equipo.',
        'Cuidamos el bienestar para que cada persona dé lo mejor.',
      ],
    },
  ],
};
