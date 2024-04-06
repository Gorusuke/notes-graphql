export interface Note {
  id: number
  title: string
  description: string
  categoryId: string
}

export interface Notes {
  notes?: Note[]
}