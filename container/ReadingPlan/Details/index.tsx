import React, { useState } from "react";
import { DailyReading, IReadingPlan, IReference } from "../../../interfaces/ReadingPlan";
import Website from "../../../layout/container/Website";
import HeaderContainer from "../../../components/HeaderContainer";
import Header from "../../../components/Header";
import HeaderPage from "../../../components/HeaderPage";
import DividerMobile from "../../../components/DividerMobile";
import { EDividerColors } from "../../../components/Divider";
import useMenu from "../../../hooks/useMenu";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import useHeader from "../../../hooks/useHeader";
import { AudioContainer, AuthorLine, Container, ContainerVerse, ContentItem, HeaderContainerPage, List, ModalAudio, ModalBible, Transcription } from "./styles";
import { PiArrowLeft, PiBook, PiFile, PiFileArchive, PiFileAudio, PiSubtitles } from "react-icons/pi";
import { FiArrowRight } from "react-icons/fi";
import ShareButton from "../../../components/ShareButton";
import { AudioPlayer } from "react-audio-play";
import Modal from "../../../components/Modal";


const Details: React.FC<{ readingPlan: IReadingPlan }> = ({
  readingPlan,
}) => {
  const { open, toggleMenu } = useMenu();
  const { goBack } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();

  const [selectedBible, setSelectedBible] = useState<IReference>();
   const [selectedAudio, setSelectedAudio] = useState<DailyReading>();

  return (
    <Website
      title={readingPlan.title}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
      hasTabNavigator={false}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <>
            {!selectedBible && !selectedAudio && (
              <Header goBack={() => goBack({
                fallback: "/reading-plan",
              })} toggleMenu={toggleMenu} />
            )}
          </>
        </HeaderContainer>
        <HeaderPage title={readingPlan.title} />
        <DividerMobile color={EDividerColors.white} />
        <Container>
          <HeaderContainerPage>
            <div>
              <PiFile /> Conteúdo
            </div>
            <ShareButton
              url={`https://pibpam.org/reading-plan/${readingPlan.uuid}`}
              message={`Leitura Bíblica: ${readingPlan.title}.`}
            />
          </HeaderContainerPage>
          <p>{readingPlan.description}</p>
          <List>
            {readingPlan.readingPlanItems?.map((item, index) => (
              <ContentItem key={item.uuid}>
                <h1>
                  <span>
                    {index + 1}/{readingPlan.readingPlanItems?.length}
                  </span>
                  {item.dailyReading.title}
                </h1>

                {item.dailyReading.references?.map((reference) => (
                  <button
                    key={reference.chapter}
                    onClick={() =>
                      setSelectedBible(reference)
                    }
                  >
                    <div>
                      <PiBook />
                    </div>
                    <div>
                      <p>Leitura Bíblica</p>
                      <h3>
                        {reference?.book.name}{" "}
                        {reference?.chapter}
                      </h3>
                    </div>
                    <FiArrowRight />
                  </button>
                ))}

                {(item.dailyReading?.devotional ||
                  item.dailyReading?.audio) && (
                  <button onClick={() => setSelectedAudio(item.dailyReading)}>
                    <div>
                      <PiFileAudio />
                    </div>
                    <div>
                      <p>Comentário</p>
                      <h3>{item.dailyReading?.author?.name}</h3>
                    </div>
                    <FiArrowRight />
                  </button>
                )}
              </ContentItem>
            ))}
          </List>
        </Container>

        <Modal
          isOpen={!!selectedBible}
          onClose={() => setSelectedBible(undefined)}
        >
          <ModalBible>
            <h2>
              <button onClick={() => setSelectedBible(undefined)}>
                <PiArrowLeft />
              </button>
              {selectedBible?.book.name} {selectedBible?.chapter}
            </h2>
            <ContainerVerse>
              {selectedBible?.verses &&
                selectedBible.verses.map((item) => (
                  <p key={item.verse}>
                    <sup>{item.verse} </sup> {item.text}
                  </p>
                ))}
            </ContainerVerse>
          </ModalBible>
        </Modal>

        <Modal
          isOpen={!!selectedAudio}
          onClose={() => setSelectedAudio(undefined)}
        >
          <ModalAudio>
            <h2>
              <button onClick={() => setSelectedAudio(undefined)}>
                <PiArrowLeft />
              </button>
              Comentário
            </h2>

            <div>
              {selectedAudio?.author && (
                <AuthorLine>
                  {selectedAudio.author.image && (
                    <div
                      style={{
                        background:
                          "url('" +
                          selectedAudio.author.image +
                          "') center/cover",
                      }}
                    ></div>
                  )}
                  {selectedAudio.author?.name}
                </AuthorLine>
              )}
            </div>

            {!!selectedAudio?.audio && (
              <AudioContainer>
                <h3>
                  <PiFileAudio /> Áudio
                </h3>
                <AudioPlayer
                  src={selectedAudio?.audio || ""}
                  volumePlacement="bottom"
                />
              </AudioContainer>
            )}

            {!!selectedAudio?.devotional && (
              <Transcription>
                {!!selectedAudio.audio && (
                  <>
                    <h3>
                      <PiSubtitles /> Transcrição
                    </h3>
                    <p>
                      Essa transcrição foi gerada utilizando inteligência
                      artificial a partir do áudio original.
                    </p>
                  </>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedAudio?.devotional || "",
                  }}
                ></div>
              </Transcription>
            )}
          </ModalAudio>
        </Modal>
      </>
    </Website>
  );
};

export default Details;
