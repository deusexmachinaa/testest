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
      EtctItems: {
        Row: {
          description: string | null
          href: string | null
          image: string | null
          index: number
          target: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          href?: string | null
          image?: string | null
          index?: number
          target?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          href?: string | null
          image?: string | null
          index?: number
          target?: string | null
          title?: string | null
        }
      }
      MenuItems: {
        Row: {
          description: string
          href: string
          id: string
          image: string
          index: number
          title: string
        }
        Insert: {
          description?: string
          href?: string
          id?: string
          image?: string
          index?: number
          title?: string
        }
        Update: {
          description?: string
          href?: string
          id?: string
          image?: string
          index?: number
          title?: string
        }
      }
      TestItems: {
        Row: {
          Description: string | null
          Href: string | null
          Image: string | null
          Index: number
          Title: string | null
        }
        Insert: {
          Description?: string | null
          Href?: string | null
          Image?: string | null
          Index?: number
          Title?: string | null
        }
        Update: {
          Description?: string | null
          Href?: string | null
          Image?: string | null
          Index?: number
          Title?: string | null
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
