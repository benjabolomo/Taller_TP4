// ==========================================
// 1. DEFINICIÓN DE TIPOS E INTERFACES
// ==========================================

// Tipo 'Prioridad' como unión de literales
type Prioridad = 'Alta' | 'Media' | 'Baja';

// Interfaz 'ITarea'
interface ITarea {
    readonly id: number;
    titulo: string;
    prioridad: Prioridad;
    completada: boolean;
    descripcion?: string;
}

// ==========================================
// 2. IMPLEMENTACIÓN DE LA CLASE
// ==========================================

class GestorTareas {
    private tareas: ITarea[];

    constructor() {
        this.tareas = [];
    }

    public agregarTarea(tarea: ITarea): void {
        this.tareas.push(tarea);
    }

    public completarTarea(id: number): void {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = true;
        }
    }

    public listarPendientes(): void {
        console.log("=== TAREAS PENDIENTES ===");
        const pendientes = this.tareas.filter(t => !t.completada);
        
        pendientes.forEach(tarea => {
            const desc = tarea.descripcion ? ` - Desc: ${tarea.descripcion}` : '';
            console.log(`[ID: ${tarea.id}] ${tarea.titulo} (${tarea.prioridad})${desc}`);
        });
    }
}

// ==========================================
// 3. PRUEBA DE EJECUCIÓN (Lógica CLI)
// ==========================================

const gestor = new GestorTareas();

gestor.agregarTarea({ id: 1, titulo: "Configurar tsconfig.json", prioridad: "Alta", completada: false });
gestor.agregarTarea({ id: 2, titulo: "Crear modelos", prioridad: "Media", completada: false, descripcion: "Definir esquemas iniciales" });

gestor.listarPendientes();
gestor.completarTarea(1);
gestor.listarPendientes();