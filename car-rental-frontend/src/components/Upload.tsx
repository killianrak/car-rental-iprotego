import { useState, } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { uploadService } from '../services/uploadService'

interface UploadProps {
  setIsAuthenticated: (value: boolean) => void;
}

type MessageType = 'success' | 'error' | '';

export default function Upload({ setIsAuthenticated }: UploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<MessageType>('')
  const navigate = useNavigate()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage('Seuls les fichiers PDF et JPEG sont acceptés')
        setMessageType('error')
        setFile(null)
        return
      }
      
      if (selectedFile.size > maxSize) {
        setMessage('Le fichier ne peut pas dépasser 5MB')
        setMessageType('error')
        setFile(null)
        return
      }
      
      setFile(selectedFile)
      setMessage('')
    }
  }

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!file) {
      setMessage('Veuillez sélectionner un fichier')
      setMessageType('error')
      return
    }
    
    setUploading(true)
    
    try {
      await uploadService.uploadFile(file)
      setMessage('Permis de conduire téléversé avec succès')
      setMessageType('success')
      setFile(null)
      const fileInput = document.getElementById('fileInput') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors du téléversement')
      setMessageType('error')
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Location de Voiture
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Téléverser votre permis de conduire
        </h2>
        
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionner le fichier (PDF ou JPEG)
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.jpg,.jpeg"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {file && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">
                Fichier sélectionné: {file.name}
              </p>
              <p className="text-sm text-gray-500">
                Taille: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-md ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {uploading ? 'Téléversement...' : 'Téléverser'}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          <p>Formats acceptés: PDF, JPEG</p>
          <p>Taille maximale: 5MB</p>
        </div>
      </div>
    </div>
  )
}