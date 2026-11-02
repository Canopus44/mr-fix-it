/**
 * Organigrama editable. Cada nodo puede tener hijos y funciones propias.
 * levels: director | coordinator | assistant
 */
export const ORG_TREE = {
  id: 'arturo',
  name: 'Arturo Angulo',
  role: 'Director general',
  level: 'director',
  initials: 'AA',
  functions: [
    'Liderar la visión estratégica y la cultura de servicio.',
    'Representar a Mr. Fix-it ante clientes, aliados y proveedores.',
    'Dirigir las coordinaciones y asegurar la sostenibilidad del negocio.',
    'Tomar decisiones finales sobre inversión, crecimiento y calidad.',
  ],
  children: [
    {
      id: 'ventas',
      name: 'Coordinación de ventas y marketing',
      role: 'Coordinador de ventas y marketing',
      level: 'coordinator',
      initials: 'CV',
      functions: [
        'Diseñar y ejecutar la estrategia comercial y de marketing.',
        'Supervisar la atención al cliente, el protocolo de atención plena y las garantías.',
        'Coordinar el catálogo, las plataformas en línea y las campañas digitales.',
        'Dirigir junto a técnicos el “Reto diario” y “Estar presente”.',
      ],
      children: [
        {
          id: 'aux-ventas',
          name: 'Auxiliar de ventas y atención al cliente',
          role: 'Auxiliar de ventas y atención al cliente',
          level: 'assistant',
          initials: 'AV',
          functions: [
            'Recibir y saludar por el nombre a cada cliente.',
            'Asesorar accesorios y registrar las ventas del taller.',
            'Gestionar garantías, reclamaciones y seguimiento posventa.',
            'Aplicar el protocolo de atención plena en cada interacción.',
          ],
        },
        {
          id: 'aux-pedidos',
          name: 'Auxiliar de pedidos y marketing',
          role: 'Auxiliar de pedidos y marketing',
          level: 'assistant',
          initials: 'AP',
          functions: [
            'Procesar pedidos de las plataformas en línea y coordinar envíos.',
            'Mantener actualizado el catálogo de productos y accesorios.',
            'Apoyar campañas, contenido y comunicación en redes sociales.',
            'Reportar oportunidades comerciales a la coordinación.',
          ],
        },
      ],
    },
    {
      id: 'tecnicos',
      name: 'Coordinación de técnicos',
      role: 'Coordinador de técnicos',
      level: 'coordinator',
      initials: 'CT',
      functions: [
        'Planificar diagnósticos, asignar cargas y controlar tiempos de reparación.',
        'Supervisar la calidad de hardware y software y el uso de repuestos.',
        'Dirigir junto a ventas el “Reto diario” y “Estar presente”.',
        'Capacitar al equipo técnico y garantizar prácticas seguras.',
      ],
      children: [
        {
          id: 'aux-software',
          name: 'Auxiliar de mantenimiento de software',
          role: 'Auxiliar de mantenimiento de software',
          level: 'assistant',
          initials: 'AS',
          functions: [
            'Realizar actualizaciones, flasheo y configuración de sistemas.',
            'Diagnosticar fallas de software y recuperar información cuando sea posible.',
            'Documentar cada intervención y realizar pruebas de funcionamiento.',
            'Escalar casos complejos a la coordinación técnica.',
          ],
        },
        {
          id: 'aux-hardware',
          name: 'Auxiliar de mantenimiento de hardware',
          role: 'Auxiliar de mantenimiento de hardware',
          level: 'assistant',
          initials: 'AH',
          functions: [
            'Ejecutar cambios de piezas, limpieza y microsoldadura.',
            'Realizar pruebas de calidad antes de entregar un equipo.',
            'Cuidar herramientas, repuestos e insumos asignados.',
            'Reportar hallazgos y necesidades de inventario.',
          ],
        },
      ],
    },
    {
      id: 'rrhh',
      name: 'Coordinación de RRHH',
      role: 'Coordinador de RRHH',
      level: 'coordinator',
      initials: 'RH',
      functions: [
        'Liderar atracción, selección, inducción y desarrollo del talento.',
        'Coordinar la evaluación del desempeño y los planes de mejoramiento.',
        'Dirigir los programas de bienestar, clima y cultura FISH.',
        'Velar por el cumplimiento de salud y seguridad en el trabajo.',
      ],
      children: [
        {
          id: 'aux-sst',
          name: 'Auxiliar de salud y seguridad en el trabajo',
          role: 'Auxiliar de salud y seguridad en el trabajo',
          level: 'assistant',
          initials: 'ST',
          functions: [
            'Identificar riesgos y actualizar la matriz de peligros del taller.',
            'Promover pausas activas, ergonomía y uso correcto de EPP.',
            'Apoyar protocolos de bioseguridad y atención de incidentes.',
            'Registrar indicadores y participar en el comité de seguridad.',
          ],
        },
        {
          id: 'aux-gh',
          name: 'Auxiliar de gestión humana',
          role: 'Auxiliar de gestión humana',
          level: 'assistant',
          initials: 'GH',
          functions: [
            'Apoyar convocatorias, entrevistas y procesos de contratación.',
            'Mantener al día las hojas de vida y los acuerdos internos.',
            'Coordinar los programas de bienestar y el “empleado del mes”.',
            'Preparar las reuniones semanales y las acciones de clima laboral.',
          ],
        },
      ],
    },
    {
      id: 'financiero',
      name: 'Coordinación financiera',
      role: 'Coordinador financiero',
      level: 'coordinator',
      initials: 'CF',
      functions: [
        'Administrar presupuesto, costos, tesorería y flujo de caja.',
        'Supervisar contabilidad, impuestos y obligaciones legales.',
        'Controlar compras, inventario y relación con proveedores.',
        'Presentar informes financieros claros a la dirección.',
      ],
      children: [
        {
          id: 'aux-contable',
          name: 'Auxiliar contable',
          role: 'Auxiliar contable',
          level: 'assistant',
          initials: 'AC',
          functions: [
            'Registrar facturación, ingresos, egresos y cartera.',
            'Preparar conciliaciones bancarias y soportes contables.',
            'Apoyar la declaración de impuestos y los cierres mensuales.',
            'Mantener organizados los documentos financieros.',
          ],
        },
        {
          id: 'aux-compras',
          name: 'Auxiliar de compras',
          role: 'Auxiliar de compras',
          level: 'assistant',
          initials: 'CP',
          functions: [
            'Solicitar cotizaciones y comparar proveedores.',
            'Gestionar órdenes de compra y recepción de repuestos.',
            'Controlar inventario y alertar necesidades de reposición.',
            'Verificar calidad, cantidades y facturas de proveedores.',
          ],
        },
      ],
    },
  ],
};

export const ORG_LEVELS = {
  director: { label: 'Dirección', accent: 'red' },
  coordinator: { label: 'Coordinación', accent: 'blue' },
  assistant: { label: 'Auxiliar', accent: 'gray' },
};

/** Devuelve una lista plana de todos los nodos (útil para navegación y métricas). */
export function flattenOrg(node = ORG_TREE) {
  return [node, ...(node.children ?? []).flatMap((child) => flattenOrg(child))];
}
