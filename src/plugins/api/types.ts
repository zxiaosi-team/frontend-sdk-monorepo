export type ExtraConfig = Record<string, (...args: any[]) => any>;

export interface ApiConfig {
  /** 请求方法（默认使用 fetch） */
  request<T>(url: string, options: RequestInit): Promise<T>;
}
