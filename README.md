# 📹 Cámara de Vigilancia usando un ESP32-CAM (Looki)

Proyecto que implementa una **cámara de vigilancia Wi-Fi** usando un **ESP32-CAM** y una **aplicación web** para visualizar el video en tiempo real.

Este repositorio contiene:

- **CameraWebServer/** → Firmware para el ESP32-CAM (Arduino / PlatformIO)  
- **esp32cam-app/** → Aplicación web en TypeScript  
- **README.md** → Este documento

---

## 📁 Estructura del proyecto

```

/
├── CameraWebServer/      # Código fuente para el ESP32-CAM
├── esp32cam-app/         # App web para ver el stream
└── README.md

```

---

# 🔌 Diagrama de conexión (para programación)



         ESP32-CAM (AI Thinker / Looki)
    +--------------------------------------+
    | [CAMERA MODULE]                      |
    |                                      |
    |  5V   -------------------+-----------+----> 5V (FTDI o fuente externa)
    |  GND  -------------------+----------------> GND (FTDI y fuente)
    |                                      |
    |  U0R (RX0) <------------------------------ TX (FTDI)
    |  U0T (TX0) ------------------------------> RX (FTDI)
    |                                      |
    |  IO0 (BOOT) ----> GND (Solo para programar) 
    +--------------------------------------+

## FTDI / USB-Serial

VCC (3.3V o 5V)*
TX  ----------------> U0R (RX0)
RX  <---------------- U0T (TX0)
GND ----------------> GND

*Recomendado: Alimentar el ESP32-CAM con una fuente externa 5V 2A.



---

# 🛠️ Requisitos

### Hardware
- ESP32-CAM (Looki / AI-Thinker)
- FTDI / USB-Serial CP2102 o CH340
- Cables Dupont
- (Opcional) Fuente externa 5V / 2A

### Software
- Arduino IDE **o** PlatformIO
- Node.js 16+
- Git
- NPM / Yarn / PNPM

---

# 🚀 Instalación del Firmware (ESP32-CAM)

## 1. Instalar soporte del ESP32 en Arduino IDE
1. Ir a:  
   `Archivo → Preferencias → Additional Boards Manager URLs`  
   Añadir:


[https://espressif.github.io/arduino-esp32/package_esp32_index.json](https://espressif.github.io/arduino-esp32/package_esp32_index.json)

```
2. Abrir **Boards Manager** e instalar *esp32 (Espressif)*.
3. Abrir:
```

CameraWebServer/CameraWebServer.ino

````

## 2. Configurar la red Wi-Fi
```cpp
const char* ssid = "TU_SSID";
const char* password = "TU_PASSWORD";
````

## 3. Configurar placa

* Placa: **AI Thinker ESP32-CAM**
* Partition Scheme: *Huge APP* (opcional)
* PSRAM: habilitado
* Velocidad Serial: **115200**

## 4. Programar la placa (modo flash)

1. Conectar `IO0` a **GND**.
2. Conectar FTDI según el diagrama.
3. Pulsar **Upload**.
4. Cuando termine, quitar IO0 de GND.
5. Pulsar **RESET**.

## 5. Ver la IP asignada

En el monitor serial (115200):

```
Camera Ready!
Stream: http://192.168.1.50
```

---

# 🌐 Ejecutar la Aplicación Web

## 1. Instalar dependencias

```bash
cd esp32cam-app
npm install
```

## 2. Configurar IP de la cámara

Crear o editar archivo `.env`:

```
VITE_CAMERA_URL=http://192.168.1.50
```

## 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

Abrir en navegador:

```
http://localhost:5173
```

---

# 📷 Visualizar la cámara

### Opción 1 — Desde el ESP32 directamente

```
http://<IP-del-ESP32-CAM>
```

### Opción 2 — Desde la app web

```
http://localhost:5173
```

---

# 🐞 Problemas comunes

### ⚠️ La cámara se reinicia

* Falta de corriente: usa una fuente externa 5V 2A.

### ⚠️ La app web no muestra el stream

* La IP no coincide con la del ESP32.
* Firewall bloqueando tráfico.
* Error en la variable `VITE_CAMERA_URL`.

### ⚠️ No sube el firmware

* IO0 no está conectado a GND.
* TX y RX están invertidos.

---

# 🌟 Mejoras futuras sugeridas

* Captura y guardado de imágenes
* Historial con miniaturas
* Detección de movimiento
* Autenticación para acceso seguro
* Modo AP cuando no hay Wi-Fi
* Dashboard avanzado con métricas

---

# 📄 Licencia

Incluye aquí tu licencia (MIT recomendado).

---

# 👤 Autor

**Aldo Raúl Martínez Choque**

