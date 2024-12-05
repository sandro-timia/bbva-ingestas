export type Ingesta = {
  id: string;
  ticketJira: string;
  nombreProyecto: string;
  nombreModelo: string;
  fechaCreacion: Date;
  fechaFin?: Date;
  estado: 'pendiente' | 'en proceso' | 'completado';
} 