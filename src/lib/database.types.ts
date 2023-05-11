export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      MenuItems: {
        Row: {
          description: string
          href: string
          id: string
          image: string
          indesx: number
          title: string
        }
        Insert: {
          description?: string
          href?: string
          id?: string
          image?: string
          indesx: number
          title?: string
        }
        Update: {
          description?: string
          href?: string
          id?: string
          image?: string
          indesx?: number
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}