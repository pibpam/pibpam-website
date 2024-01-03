import type { NextPage } from 'next'
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../../contexts/user';
import Website from '../../../layout/container/Website';
import HeaderMember from '../../../components/HeaderMember';
import { ButtonSave, Container, List, ListItems, MemberRotation, ModalOpen } from '../../../styles/Rotation';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { Api } from '../../../services/api';
import { IGetMemberRotations, IRotation } from '../../../interfaces/Rotation';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'
import { FiArrowRight, FiCheck, FiInfo, FiUpload, FiX } from 'react-icons/fi';
import { DateUtils } from '../../../utils/Date';

const Member: NextPage = () => {

  const { token } = useContext(UserContext)
  const { goTo } = useAppNavigation()
  const [team, setTeams] = useState<undefined | IGetMemberRotations>()
  const [selectedRotation, setSelectedRotation] = useState<undefined | IRotation>()
  const [userAvailability, setUserAvailability] = useState<{ uuid: string, availability: 'unavailable' | 'available' | 'unknown' }[]>([])

  const getRotations = async (token: string) => {
    const api = new Api()
    const data = await api.getRotations(token)
    setTeams(data)
  }

  useEffect(() => {
    const availability: { uuid: string, availability: 'unavailable' | 'available' | 'unknown' }[] = []
    selectedRotation?.items?.map(item => {
      if (item.availabilityRotationMembers[0]?.status) {
        availability.push({
          uuid: item.uuid,
          availability: item.availabilityRotationMembers[0].status
        })
      }
    })
    setUserAvailability(availability)
  }, [selectedRotation])

  useEffect(() => {
    if (token) {
      getRotations(token)
    }
  }, [token])

  const handleAvailability = async (uuid: string, availability: 'unavailable' | 'available' | 'unknown') => {

    if (!token) {
      alert('Usuário não está autenticado.')
      return
    }

    const find = userAvailability?.find(item => item.uuid === uuid)

    if (find) {
      setUserAvailability(state => state.map(item => {
        if (item.uuid === uuid) {
          item.availability = availability
        }
        return item
      }))
    } else {
      setUserAvailability([...userAvailability, { uuid, availability }])
    }

    const api = new Api()
    await api.saveAvailability(token, {
      rotationItem: uuid,
      status: availability
    })

    getRotations(token)
  }

  const checkOptionAvailability = (uuid: string): 'unavailable' | 'available' | 'unknown' | undefined => {
    const find = userAvailability?.find(item => item.uuid === uuid)
    return find?.availability
  }

  return (
    <>
      <Website hasTabNavigator={false} title={"Área de membros"} openMenu={false} toggleMenu={() => { }}>
        <Container >
          <HeaderMember goBack={() => goTo({ pathname: '/member', resetHistory: true })} title={"Escalas"} />
          <p>
            Veja, acompanhe e preencha as escalas dos ministérios que você participa.
          </p>
          <List>
            {team?.map(item => <MemberRotation key={item.uuid}>
              <div>
                <div>Ministério</div>
                <div>{item.name}</div>
              </div>
              <div>
                {item?.rotations.map(item => <button onClick={() => setSelectedRotation(item)} key={item.uuid}>
                  <div>{item.title} <FiArrowRight/> </div>
                  <div>
                   <FiInfo/> {item.status === 'open' && `Escala aberta. Preencha com sua disponibilidade.`}
                  </div>
                </button>)}
              </div>
            </MemberRotation>)}
          </List>
        </Container>
      </Website>
      <BottomSheet onDismiss={() => setSelectedRotation(undefined)} open={!!selectedRotation}>
        <ModalOpen>
          <div>
            <h1>Escala</h1>
            <h2>{selectedRotation?.title}</h2>
            <p>Prencha a escala de acordo com a sua disponibilidade. Sua resposta não garante o dia da escala. A definição será feita posteriormente pelo líder do ministério.</p>
          </div>
          <ListItems>
            {selectedRotation?.items.map(item => <div key={item.uuid}>
              <div>
                <div>
                  {item.rotationDate && DateUtils.formatDateDayAndMonth(item.rotationDate)}
                </div>
                <div>
                  {item.rotationDate && DateUtils.getWeekdayStr(item.rotationDate)}
                </div>
                <div>
                  {item.rotationDate && DateUtils.formatTime(item.rotationDate)}
                </div>
              </div>
              <div>
                <button className={`${checkOptionAvailability(item.uuid) === 'available' && 'active'}`} onClick={() => handleAvailability(item.uuid, 'available')} >
                  <FiCheck /> Sim
                </button>
                <button className={`${checkOptionAvailability(item.uuid) === 'unavailable' && 'active'}`} onClick={() => handleAvailability(item.uuid, 'unavailable')} >
                  <FiX /> Não
                </button>
                <button className={`${checkOptionAvailability(item.uuid) === 'unknown' && 'active'}`} onClick={() => handleAvailability(item.uuid, 'unknown')} >
                  Talvez
                </button>
              </div>
            </div>)}
          </ListItems>
          <ButtonSave>
            <button onClick={() => setSelectedRotation(undefined)} > <FiUpload /> Salvar</button>
          </ButtonSave>
        </ModalOpen>
      </BottomSheet>
    </>
  )
}

export default Member
