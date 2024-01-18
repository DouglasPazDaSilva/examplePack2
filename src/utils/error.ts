import { AxiosError } from 'axios'

export interface GlobalError {
  status: number
  code: number
  message: string
}

export function handleError(error: unknown): GlobalError {
  if (error instanceof AxiosError) {
    // time out error
    if (error.code && error.code === 'ECONNABORTED') {
      return {
        status: 500,
        code: 500,
        message: 'Falha de conexão, tente novamente.',
      }
    }

    // api error
    if (error.response) {
      return {
        ...error.response.data,
        status: error.response.status || 500,
        code: error.response.data?.detail?.error?.code || error.response.data?.code || 500,
        message: error.response.data?.detail?.error?.message || error.response.data?.message || 'Erro interno',
      }
    }
    // api error sem response
    return {
      ...error,
      status: 500,
      code: 500,
      message: error.message,
    }
  }

  // generic error
  return {
    status: 500,
    code: 500,
    message: error instanceof Error ? error.message : 'Erro desconhecido',
  }
}
