export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      competition_players: {
        Row: {
          competition_id: string
          created_at: string
          final_score: number | null
          has_paid: boolean
          id: string
          user_id: string
        }
        Insert: {
          competition_id: string
          created_at?: string
          final_score?: number | null
          has_paid?: boolean
          id?: string
          user_id: string
        }
        Update: {
          competition_id?: string
          created_at?: string
          final_score?: number | null
          has_paid?: boolean
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_players_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          buy_in: number
          course_name: string | null
          created_at: string
          creator_id: string | null
          id: string
          pot_total: number
          status: Database["public"]["Enums"]["competition_status"]
          tee_time: string | null
          updated_at: string
          winner_id: string | null
        }
        Insert: {
          buy_in: number
          course_name?: string | null
          created_at?: string
          creator_id?: string | null
          id?: string
          pot_total?: number
          status?: Database["public"]["Enums"]["competition_status"]
          tee_time?: string | null
          updated_at?: string
          winner_id?: string | null
        }
        Update: {
          buy_in?: number
          course_name?: string | null
          created_at?: string
          creator_id?: string | null
          id?: string
          pot_total?: number
          status?: Database["public"]["Enums"]["competition_status"]
          tee_time?: string | null
          updated_at?: string
          winner_id?: string | null
        }
        Relationships: []
      }
      foursome_posts: {
        Row: {
          course_name: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          spots_needed: number
          tee_time: string
          user_id: string
        }
        Insert: {
          course_name: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          spots_needed?: number
          tee_time: string
          user_id: string
        }
        Update: {
          course_name?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          spots_needed?: number
          tee_time?: string
          user_id?: string
        }
        Relationships: []
      }
      golfer_profiles: {
        Row: {
          bio: string | null
          business_topics: string[] | null
          city: string | null
          competitive_preference: string | null
          created_at: string
          deal_breakers: string[] | null
          display_name: string | null
          encouragement_style: string | null
          formats_enjoyed: string[] | null
          gender_preference: string | null
          group_size_preference: string | null
          handicap_index: number | null
          hobbies: string[] | null
          home_course: string | null
          humor_style: string | null
          id: string
          industry: string | null
          introvert_extrovert: string | null
          lifestyle_flexibility: string | null
          networking_openness: string | null
          pace_preference: string | null
          preferred_days: string[] | null
          preferred_handicap_max: number | null
          preferred_handicap_min: number | null
          preferred_tee_times: string[] | null
          search_radius_miles: number | null
          show_handicap: boolean | null
          show_location: boolean | null
          show_photo: boolean | null
          talkative_level: number | null
          topics_to_avoid: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          business_topics?: string[] | null
          city?: string | null
          competitive_preference?: string | null
          created_at?: string
          deal_breakers?: string[] | null
          display_name?: string | null
          encouragement_style?: string | null
          formats_enjoyed?: string[] | null
          gender_preference?: string | null
          group_size_preference?: string | null
          handicap_index?: number | null
          hobbies?: string[] | null
          home_course?: string | null
          humor_style?: string | null
          id?: string
          industry?: string | null
          introvert_extrovert?: string | null
          lifestyle_flexibility?: string | null
          networking_openness?: string | null
          pace_preference?: string | null
          preferred_days?: string[] | null
          preferred_handicap_max?: number | null
          preferred_handicap_min?: number | null
          preferred_tee_times?: string[] | null
          search_radius_miles?: number | null
          show_handicap?: boolean | null
          show_location?: boolean | null
          show_photo?: boolean | null
          talkative_level?: number | null
          topics_to_avoid?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          business_topics?: string[] | null
          city?: string | null
          competitive_preference?: string | null
          created_at?: string
          deal_breakers?: string[] | null
          display_name?: string | null
          encouragement_style?: string | null
          formats_enjoyed?: string[] | null
          gender_preference?: string | null
          group_size_preference?: string | null
          handicap_index?: number | null
          hobbies?: string[] | null
          home_course?: string | null
          humor_style?: string | null
          id?: string
          industry?: string | null
          introvert_extrovert?: string | null
          lifestyle_flexibility?: string | null
          networking_openness?: string | null
          pace_preference?: string | null
          preferred_days?: string[] | null
          preferred_handicap_max?: number | null
          preferred_handicap_min?: number | null
          preferred_tee_times?: string[] | null
          search_radius_miles?: number | null
          show_handicap?: boolean | null
          show_location?: boolean | null
          show_photo?: boolean | null
          talkative_level?: number | null
          topics_to_avoid?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      match_requests: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          message: string | null
          status: string
          to_user_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          message?: string | null
          status?: string
          to_user_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          message?: string | null
          status?: string
          to_user_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          is_active: boolean
          multiplier: number
          name: string
          starts_at: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          is_active?: boolean
          multiplier?: number
          name: string
          starts_at: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          is_active?: boolean
          multiplier?: number
          name?: string
          starts_at?: string
        }
        Relationships: []
      }
      swing_analyses: {
        Row: {
          chat_history: Json | null
          created_at: string
          drills: Json | null
          id: string
          improvements: Json | null
          motivational_message: string | null
          overall_score: number | null
          strengths: Json | null
          updated_at: string
          user_id: string
          video_url: string | null
        }
        Insert: {
          chat_history?: Json | null
          created_at?: string
          drills?: Json | null
          id?: string
          improvements?: Json | null
          motivational_message?: string | null
          overall_score?: number | null
          strengths?: Json | null
          updated_at?: string
          user_id: string
          video_url?: string | null
        }
        Update: {
          chat_history?: Json | null
          created_at?: string
          drills?: Json | null
          id?: string
          improvements?: Json | null
          motivational_message?: string | null
          overall_score?: number | null
          strengths?: Json | null
          updated_at?: string
          user_id?: string
          video_url?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          clover_balance: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          clover_balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          clover_balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_wallet_funds: {
        Args: {
          p_amount: number
          p_description: string
          p_transaction_type: Database["public"]["Enums"]["transaction_type"]
          p_user_id: string
          p_wallet_id: string
        }
        Returns: Json
      }
      award_clovers: {
        Args: { p_amount: number; p_user_id: string }
        Returns: Json
      }
      create_competition: {
        Args: {
          p_buy_in: number
          p_course_name?: string
          p_tee_time?: string
          p_user_id: string
        }
        Returns: Json
      }
      deduct_wallet_funds: {
        Args: {
          p_amount: number
          p_description: string
          p_transaction_type: Database["public"]["Enums"]["transaction_type"]
          p_user_id: string
          p_wallet_id: string
        }
        Returns: Json
      }
      join_competition: {
        Args: { p_competition_id: string; p_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      competition_status: "pending" | "active" | "completed" | "cancelled"
      transaction_type:
        | "deposit"
        | "withdrawal"
        | "buy_in"
        | "winnings"
        | "purchase"
        | "refund"
        | "clover_earned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      competition_status: ["pending", "active", "completed", "cancelled"],
      transaction_type: [
        "deposit",
        "withdrawal",
        "buy_in",
        "winnings",
        "purchase",
        "refund",
        "clover_earned",
      ],
    },
  },
} as const
