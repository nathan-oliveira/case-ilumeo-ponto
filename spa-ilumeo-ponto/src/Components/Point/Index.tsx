import React from 'react'
import './index.css'

import { useSelector } from 'react-redux';

import { GET_HOURS_WORKED_TODAY, POST_REGISTER_POINT, GET_LAST_RECORDS } from '../../Services/api';
import useFetch from '../../Hooks/useFetch';

import Button from '../Templates/Form/Button/Index';
import If from '../Templates/Operator/If';
import Loading from '../Templates/Loading/Index';

const Point = () => {
  const { userCode } = useSelector((state: any) => state.user);
  const { data: dataHoursWorkedToday, request: requestHoursWorkedToday }: any = useFetch();
  const { loading: loadingLastWorked, data: dataLastWorked, request: requestLastWorked }: any = useFetch();
  const { request: requestPostRegisterPoint } = useFetch();

  function getHoursWorkedToday() {
    const { url, options } = GET_HOURS_WORKED_TODAY();
    const params = { userCode };
    requestHoursWorkedToday(`${url}?${new URLSearchParams(params)}`, options);
  }

  function getLastWorked() {
    const { url, options } = GET_LAST_RECORDS();
    const params = { userCode };
    requestLastWorked(`${url}?${new URLSearchParams(params)}`, options);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (userCode) {
      const dataForm = { userCode };

      const { url, options } = POST_REGISTER_POINT({ dataForm });
      const { response }: any = await requestPostRegisterPoint(url, options);
      if (response.ok) getHoursWorkedToday()
    }
  }

  React.useEffect(() => {
    function execute() {
      getHoursWorkedToday();
      getLastWorked();
    }

    execute();
  }, [userCode]);

  if (loadingLastWorked) return <Loading />;
  return (
    <section className="form-section">
      <form onSubmit={handleSubmit} autoComplete="off" className="form-point">
        <div className="point-header">
          <p className="point-header-title">Relógio de ponto</p>
          <div className="point-header-group">
            <p className="point-header-title">#{userCode}</p>
            <p className="point-header-subtitle">Usuário</p>
          </div>
        </div>

        <div className="point-body">
          <If test={dataHoursWorkedToday !== null}>
            <div className="point-body-content">
              <p className="point-body-content-title">{dataHoursWorkedToday?.hours || '0'}h {dataHoursWorkedToday?.minutes || '00'}m</p>
              <p className="point-body-content-subtitle">Horas de hoje</p>
            </div>
          </If>

          <Button classBtn="mt-3 mb-3">
            <If test={dataHoursWorkedToday?.lastRecordType === 'EXIT'}>Hora de entrada</If>
            <If test={dataHoursWorkedToday?.lastRecordType !== 'EXIT'}>Hora de saída</If>
          </Button>

          <div className="point-last">
            <p className="point-last-title mb-1">Dias anteriores</p>

            {dataLastWorked && dataLastWorked.map(({ registrationDate, hoursWorked }: any, index: number) => {
              return (
                <div className="point-last-content mb-1" key={index}>
                  <span className="point-last-content-day">{registrationDate}</span>
                  <span className="point-last-content-hour">{hoursWorked?.hours || '0'}h {hoursWorked?.minutes || '00'}m</span>
                </div>
              )
            })}
          </div>
        </div>
      </form>
    </section>
  )
}

export default Point;
