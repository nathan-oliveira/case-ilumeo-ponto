export const URL_API = import.meta.env.VITE_URL_API

export function GET_HOURS_WORKED_TODAY() {
  return {
    url: `${URL_API}/points/hours-worked-today`,
    options: {
      method: 'GET',
    }
  }
}

export function GET_LAST_RECORDS() {
  return {
    url: `${URL_API}/points`,
    options: {
      method: 'GET',
    }
  }
}

export function POST_REGISTER_POINT({ dataForm }: any) {
  return {
    url: `${URL_API}/points`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    },
  };
}
