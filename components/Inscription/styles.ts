import styled, { css } from 'styled-components'
import { FiCheck } from 'react-icons/fi'
import { ImSpinner2 } from 'react-icons/im'
import theme from '../../styles/theme'

export const Flow = styled.div`
  display: flex;
  flex-direction: column;
`

export const Stepper = styled.div`
  position: sticky;
  z-index: 5;
  background: linear-gradient(180deg, ${theme.colors.white} 0%, ${theme.colors.white} 70%, rgba(255, 255, 255, 0.85) 100%);
  padding: 10px 0 14px;
  margin-bottom: ${theme.spacing.md};
`

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const ProgressStep = styled.div<{ $active?: boolean, $done?: boolean }>`
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background: ${theme.colors.tealBorder};
  transition: background 0.25s ease;

  ${({ $active }) => $active && css`
    background: ${theme.colors.primary};
  `}

  ${({ $done }) => $done && css`
    background: ${theme.colors.secondary};
  `}
`

export const StepperLabel = styled.span`
  display: block;
  margin-top: ${theme.spacing.sm};
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.gray550};
`

export const StepViewport = styled.div`
  overflow-x: hidden;
`

const stepInForward = css`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const stepInBack = css`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Step = styled.div<{ $direction?: 'forward' | 'back' }>`
  opacity: 1;

  ${({ $direction }) => $direction === 'forward' && css`
    animation: step_in_forward 0.28s ease-in-out;

    @keyframes step_in_forward {
      ${stepInForward}
    }
  `}

  ${({ $direction }) => $direction === 'back' && css`
    animation: step_in_back 0.28s ease-in-out;

    @keyframes step_in_back {
      ${stepInBack}
    }
  `}
`

export const Hero = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: ${theme.radius.xxl};
  overflow: hidden;
  background-color: ${theme.colors.tealBorderCard};
  background-position: center;
  background-size: cover;
  margin-bottom: ${theme.spacing.base};
`

export const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: ${theme.spacing.base};

  > span {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.gray700};
    font-size: 14px;

    > svg {
      color: ${theme.colors.primary};
      flex-shrink: 0;
    }
  }
`

export const CheckRegistration = styled.div`
  margin-bottom: ${theme.spacing.base};
  background: ${theme.colors.tealTintLight};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xl};
  padding: 14px ${theme.spacing.base};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};

  > span {
    font-size: 14px;
    color: ${theme.colors.gray700};
  }
`

export const CheckRegistrationLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  padding: 0;
  color: ${theme.colors.tealDark};
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  flex-shrink: 0;

  > svg {
    font-size: 15px;
  }
`

export const EventDescription = styled.div`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: ${theme.spacing.sm};

  img {
    max-width: 100%;
    border-radius: ${theme.radius.lg};
  }

  h1, h2, h3 {
    color: ${theme.colors.gray800};
    margin: ${theme.spacing.base} 0 ${theme.spacing.sm};
  }

  p {
    margin-bottom: 10px;
  }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 10px;
  }

  a {
    color: ${theme.colors.tealDark};
    text-decoration: underline;
  }
`

export const StepTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.colors.gray800};
  margin-bottom: 4px;
`

export const StepSubtitle = styled.p`
  color: ${theme.colors.gray650};
  font-size: 14px;
  margin-bottom: 20px;
`

export const Choices = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

export const Choice = styled.button<{ $selected?: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.base};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover {
    border-color: ${theme.colors.tealLight};
  }

  ${({ $selected }) => $selected && css`
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.18);
  `}
`

export const ChoiceTitle = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray800};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`

export const ChoiceDesc = styled.span`
  font-size: 13px;
  color: ${theme.colors.gray650};
`

export const ChoicePrice = styled.span`
  color: ${theme.colors.success};
  font-weight: 600;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  > label {
    color: ${theme.colors.gray700};
    font-size: 14px;
    font-weight: 600;
  }

  > input,
  > select,
  > textarea {
    width: 100%;
    border: 1px solid ${theme.colors.tealBorderSoft};
    border-radius: ${theme.radius.xl};
    padding: ${theme.spacing.md} 14px;
    font-size: 16px;
    color: ${theme.colors.gray800};
    background: ${theme.colors.white};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.2);
    }

    &::placeholder {
      color: ${theme.colors.gray350};
      opacity: 1;
    }
  }

  > textarea {
    min-height: 90px;
    resize: vertical;
  }
`

export const Required = styled.span`
  color: ${theme.colors.error};
`

export const SelfNote = styled.div`
  background: ${theme.colors.tealTintLight};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.lg};
  padding: 10px ${theme.spacing.md};
  font-size: 13px;
  color: ${theme.colors.tealDark};
`

export const Participant = styled.div`
  border: 1px solid ${theme.colors.tealBorder};
  border-radius: ${theme.radius.dialog};
  padding: ${theme.spacing.base};
  background: ${theme.colors.white};
  margin-bottom: ${theme.spacing.base};
`

export const ParticipantHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};

  > strong {
    color: ${theme.colors.gray800};
    font-size: 16px;
  }
`

export const ParticipantRemove = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

export const AddonGroups = styled.div`
  margin-top: ${theme.spacing.base};
`

export const Addon = styled.button<{ $selected?: boolean, $disabled?: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  position: relative;

  &:hover {
    border-color: ${theme.colors.tealLight};
  }

  ${({ $selected }) => $selected && css`
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.18);
  `}

  ${({ $disabled }) => $disabled && css`
    opacity: 0.55;
    cursor: not-allowed;

    &:hover {
      border-color: ${theme.colors.tealBorderSoft};
    }
  `}
`

export const AddonImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: ${theme.radius.lg};
  object-fit: cover;
  flex-shrink: 0;
  background: ${theme.colors.tealTint};
`

export const AddonInfo = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`

export const AddonName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray800};
  font-size: 15px;
`

export const AddonDesc = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray650};
`

export const AddonMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 2px;
`

export const AddonAvail = styled.span`
  font-size: 12px;
  color: ${theme.colors.success};
`

export const AddonSoldout = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.error};
`

export const AddonCheck = styled(FiCheck)`
  color: ${theme.colors.primary};
  font-size: 20px;
  flex-shrink: 0;
`

export const AddParticipantBtn = styled.button`
  width: 100%;
  border: 1px dashed ${theme.colors.secondary};
  border-radius: ${theme.radius.xxl};
  padding: 14px;
  background: #FBFDE9;
  color: ${theme.colors.successText};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
`

export const PaymentLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

export const PaymentIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.tealHover};
  color: ${theme.colors.tealDark};
  flex-shrink: 0;

  > svg {
    font-size: 20px;
  }
`

export const ErrorBox = styled.div`
  background: ${theme.colors.errorTint};
  color: ${theme.colors.errorText};
  border: 1px solid ${theme.colors.errorBorder};
  border-radius: ${theme.radius.lg};
  padding: 10px ${theme.spacing.md};
  font-size: 14px;
  margin: ${theme.spacing.base} 0 0;
`

export const Nav = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: auto;
  padding-top: ${theme.spacing.lg};

  > button {
    flex: 1;
  }
`

export const Spinner = styled(ImSpinner2)`
  animation: inscription_spin 0.6s linear infinite;

  @keyframes inscription_spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
