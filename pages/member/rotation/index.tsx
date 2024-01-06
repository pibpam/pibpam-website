import type { NextPage } from 'next'
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../../contexts/user';
import Website from '../../../layout/container/Website';
import HeaderMember from '../../../components/HeaderMember';
import { ButtonSave, Container, HeaderItem, List, ListItems, MemberRotation, MembersSelecteds, ModalOpen } from '../../../styles/Rotation';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { IGetMemberRotations, IRotation, IRotationMember } from '../../../interfaces/Rotation';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'
import { FiArrowRight, FiCheck, FiInfo, FiUpload, FiX } from 'react-icons/fi';
import { DateUtils } from '../../../utils/Date';
import { ApiLocal } from '../../../services/apiLocal';
import { AppContext } from '../../../contexts/app';

const Member: NextPage = () => {

  const { token, user } = useContext(UserContext)
  const { goTo } = useAppNavigation()
  const [team, setTeams] = useState<undefined | IGetMemberRotations>()
  const [selectedRotation, setSelectedRotation] = useState<undefined | IRotation>()
  const [userAvailability, setUserAvailability] = useState<{ uuid: string, availability: 'unavailable' | 'available' | 'unknown' }[]>([])
  const [maxHei, setMaxHei] = useState(0)
  const { isApp } = useContext(AppContext)

  const getRotations = async (token: string) => {
    const api = new ApiLocal()
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

  useEffect(() => {
    if (window) {
      setMaxHei(window.screen.height - 60)
    }
  }, [])

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

    const api = new ApiLocal()
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

  const statusMessage = {
    open: 'Escala aberta. Preencha com sua disponibilidade.',
    live: 'Escala em andamento. Você ainda pode preencher ou alterar a sua disponibilidade.'
  } as Record<string, string>

  const descriptionMessage = {
    open: 'Prencha a escala de acordo com a sua disponibilidade. Sua resposta não garante o dia da escala. A definição será feita posteriormente pelo líder do ministério.',
    live: 'A escala está em andamento! Fique atento aos dias que você foi escalado. Você não pode alterar a disponibilidade destes dias. Caso tenha imprevistos, contate o seu líder.'
  } as Record<string, string>

  const verifyIfLoggedUser = (memberUuid: string) => {
    return user?.member.uuid === memberUuid
  }

  const verifyIfLoggedUserWasSelected = (rotations: IRotationMember[]) => {
    return !!rotations.find(item => item.member.uuid === user?.member.uuid)
  }

  return (
    <>
      <Website hasTabNavigator={false} title={"Área de membros"} openMenu={false} toggleMenu={() => { }}>
        <>
          <HeaderMember goBack={() => goTo({ pathname: '/member', resetHistory: true })} title={"Escalas"} />
          <Container >
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
                    <div>{item.title} <FiArrowRight /> </div>
                    <div>
                      <FiInfo /> {statusMessage[item.status] || 'Sem detalhes.'}
                    </div>
                  </button>)}
                </div>
              </MemberRotation>)}
            </List>
          </Container>
        </>
      </Website>
      <BottomSheet maxHeight={isApp ? (maxHei || undefined) : undefined} onDismiss={() => setSelectedRotation(undefined)} open={!!selectedRotation}>
        <ModalOpen>
          <div>
            <h1>Escala</h1>
            <h2>{selectedRotation?.title}</h2>
            <p>{descriptionMessage[selectedRotation?.status] || ''}</p>
          </div>
          <ListItems>
            {selectedRotation?.items.sort((a, b) => {

              if (!a.rotationDate || !b.rotationDate) {
                return 0
              }

              if (new Date(a.rotationDate) > new Date(b.rotationDate)) {
                return 1
              }
              if (new Date(a.rotationDate) < new Date(b.rotationDate)) {
                return -1
              }

              return 0
            }).map(item => <div key={item.uuid}>
              <HeaderItem>
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
                <div className={`buttonsActions ${verifyIfLoggedUserWasSelected(item.rotationItemMembers || []) ? 'selected' : ''}`}>
                  <button disabled={!!verifyIfLoggedUserWasSelected(item.rotationItemMembers || [])} className={`${checkOptionAvailability(item.uuid) === 'available' && 'active'}`} onClick={() => handleAvailability(item.uuid, 'available')} >
                    <FiCheck /> Sim
                  </button>
                  <button disabled={!!verifyIfLoggedUserWasSelected(item.rotationItemMembers || [])} className={`${checkOptionAvailability(item.uuid) === 'unavailable' && 'active'}`} onClick={() => handleAvailability(item.uuid, 'unavailable')} >
                    <FiX /> Não
                  </button>
                  <button disabled={!!verifyIfLoggedUserWasSelected(item.rotationItemMembers || [])} className={`${checkOptionAvailability(item.uuid) === 'unknown' && 'active'}`} onClick={() => handleAvailability(item.uuid, 'unknown')} >
                    Talvez
                  </button>
                </div>
              </HeaderItem>
              {selectedRotation.status !== 'open' && (
                <MembersSelecteds >
                  {item.rotationItemMembers?.map(member => (<div key={member.uuid} className={`${verifyIfLoggedUser(member.member.uuid) ? 'active' : ''}`} >
                    <div>Responsável</div>
                    <div>{member.member.name}</div>
                  </div>))}
                </MembersSelecteds>
              )}
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
