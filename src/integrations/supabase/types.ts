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
      clover_campaigns: {
        Row: {
          created_at: string
          daily_cap: number
          ends_at: string | null
          id: string
          is_active: boolean
          lifetime_seconds: number
          min_interval_seconds: number
          multiplier: number
          name: string
          poll_interval_seconds: number
          priority: number
          rare_chance: number
          rare_reward_multiplier: number
          reward: number
          slug: string
          spawn_chance: number
          starts_at: string | null
        }
        Insert: {
          created_at?: string
          daily_cap?: number
          ends_at?: string | null
          id?: string
          is_active?: boolean
          lifetime_seconds?: number
          min_interval_seconds?: number
          multiplier?: number
          name: string
          poll_interval_seconds?: number
          priority?: number
          rare_chance?: number
          rare_reward_multiplier?: number
          reward?: number
          slug: string
          spawn_chance?: number
          starts_at?: string | null
        }
        Update: {
          created_at?: string
          daily_cap?: number
          ends_at?: string | null
          id?: string
          is_active?: boolean
          lifetime_seconds?: number
          min_interval_seconds?: number
          multiplier?: number
          name?: string
          poll_interval_seconds?: number
          priority?: number
          rare_chance?: number
          rare_reward_multiplier?: number
          reward?: number
          slug?: string
          spawn_chance?: number
          starts_at?: string | null
        }
        Relationships: []
      }
      monocle_clovers: {
        Row: {
          campaign_id: string | null
          collected_at: string | null
          expires_at: string
          id: string
          kind: string
          reward: number
          spawned_at: string
          status: string
          user_id: string
        }
        Insert: {
          campaign_id?: string | null
          collected_at?: string | null
          expires_at: string
          id?: string
          kind: string
          reward: number
          spawned_at?: string
          status?: string
          user_id: string
        }
        Update: {
          campaign_id?: string | null
          collected_at?: string | null
          expires_at?: string
          id?: string
          kind?: string
          reward?: number
          spawned_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monocle_clovers_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "clover_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      monocle_sessions: {
        Row: {
          avg_fps: number | null
          avg_proc_ms: number | null
          brackets: number | null
          calibrated: boolean | null
          camera_height: number | null
          camera_width: number | null
          created_at: string
          device_tier: string | null
          duration_seconds: number
          frames: number | null
          id: string
          locks: number | null
          max_locked_yards: number | null
          old_phone_warning: boolean | null
          started_at: string
          user_id: string
        }
        Insert: {
          avg_fps?: number | null
          avg_proc_ms?: number | null
          brackets?: number | null
          calibrated?: boolean | null
          camera_height?: number | null
          camera_width?: number | null
          created_at?: string
          device_tier?: string | null
          duration_seconds: number
          frames?: number | null
          id?: string
          locks?: number | null
          max_locked_yards?: number | null
          old_phone_warning?: boolean | null
          started_at?: string
          user_id: string
        }
        Update: {
          avg_fps?: number | null
          avg_proc_ms?: number | null
          brackets?: number | null
          calibrated?: boolean | null
          camera_height?: number | null
          camera_width?: number | null
          created_at?: string
          device_tier?: string | null
          duration_seconds?: number
          frames?: number | null
          id?: string
          locks?: number | null
          max_locked_yards?: number | null
          old_phone_warning?: boolean | null
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      monocle_settings: {
        Row: {
          calibrations: Json
          created_at: string
          stick_height_in: number
          updated_at: string
          user_id: string
          wedge_config: Json | null
        }
        Insert: {
          calibrations?: Json
          created_at?: string
          stick_height_in?: number
          updated_at?: string
          user_id: string
          wedge_config?: Json | null
        }
        Update: {
          calibrations?: Json
          created_at?: string
          stick_height_in?: number
          updated_at?: string
          user_id?: string
          wedge_config?: Json | null
        }
        Relationships: []
      }
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
      monocle_collect_clover: {
        Args: { p_clover_id: string }
        Returns: Json
      }
      monocle_request_clover: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
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
