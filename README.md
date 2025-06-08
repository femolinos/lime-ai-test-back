# Lime AI API

A REST API for processing audio transcriptions and generating clinical documentation using AI. This API is designed to handle audio files, transcribe them using OpenAI's Whisper model, and generate structured clinical notes based on the transcriptions.

## 🚀 Features

- Audio file transcription using OpenAI's Whisper
- Clinical note generation with GPT-3.5
- Patient and note management
- File upload handling with support for multiple audio formats
- Input validation using Zod
- TypeScript support
- Prisma ORM for database operations

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker
- OpenAI API key

## 🔧 Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies:
```bash
yarn
```

3. Initialize Docker and run the Docker Compose command on the root of the project:
```bash
docker compose up -d
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
OPENAI_API_KEY="your-openai-api-key"
```

5. Set up the database:
```bash
npx prisma migrate dev
```

6. Seed the database with sample data:
```bash
yarn seed
```

7. Start the development server:
```bash
yarn dev
```

## 🛠️ Core Dependencies

- **Express**: Web framework for Node.js
- **Prisma**: ORM for database operations
- **OpenAI**: AI services for transcription and text generation
- **Multer**: File upload handling
- **Zod**: Runtime type checking and validation
- **TypeScript**: Type-safe JavaScript
- **CORS**: Cross-origin resource sharing support

## 📚 API Documentation

### Patients

#### GET /patients
Retrieves all patients.

**Response:**
```json
{
  "message": "Patients found",
  "patients": [
    {
      "id": "string",
      "name": "string",
      "dateOfBirth": "string",
      "patientId": "string",
      "createdAt": "Date",
      "updatedAt": "Date",
    }
  ]
}
```

#### GET /patient/:id
Retrieves a specific patient by ID.

**Response:**
```json
{
  "message": "Patient found",
  "patient": {
    "id": "string",
    "name": "string",
    "dateOfBirth": "string",
    "patientId": "string",
    "createdAt": "Date",
    "updatedAt": "Date",
  }
}
```

### Notes

#### GET /notes
Retrieves all notes.

**Response:**
```json
{
  "message": "Notes found",
  "notes": [
    {
      "id": "string",
      "patientId": "string",
      "transcription": "string",
      "summary": "string",
      "m1800": "string",
      "m1810": "string",
      "m1820": "string",
      "m1830": "string",
      "m1840": "string",
      "m1850": "string",
      "m1860": "string",
    }
  ]
}
```

#### GET /note/:id
Retrieves a specific note by ID.

**Response:**
```json
{
  "message": "Note found",
  "note": {
    "id": "string",
    "patientId": "string",
    "transcription": "string",
    "summary": "string",
    "m1800": "string",
    "m1810": "string",
    "m1820": "string",
    "m1830": "string",
    "m1840": "string",
    "m1850": "string",
    "m1860": "string",
  }
}
```

#### POST /note
Creates a new note with audio transcription.

**Request:**
- Content-Type: multipart/form-data
- Body:
  - `patientId`: string
  - `file`: audio file (supported formats: flac, m4a, mp3, mp4, ogg, wav, webm)

**Response:**
```json
{
  "message": "Note created successfully",
  "note": {
    "id": "string",
    "patientId": "string",
    "transcription": "string",
    "summary": "string",
    "m1800": "string",
    "m1810": "string",
    "m1820": "string",
    "m1830": "string",
    "m1840": "string",
    "m1850": "string",
    "m1860": "string",
  }
}
```

#### PUT /note/:id
Updates an existing note.

**Request:**
```json
{
  "patientId": "string",
  "transcription": "string",
  "summary": "string"
}
```

**Response:**
```json
{
  "message": "Note updated successfully",
  "note": {
    "id": "string",
    "patientId": "string",
    "transcription": "string",
    "summary": "string",
    "m1800": "string",
    "m1810": "string",
    "m1820": "string",
    "m1830": "string",
    "m1840": "string",
    "m1850": "string",
    "m1860": "string",
  }
}
```
