"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { useDeveloperModal } from "./developerModal.context";
import type { Developer, Level } from "@/package/interfaces";

import { Input } from "@/package/components/input";
import { Button } from "@/package/components/button";
import { createDeveloper } from "@/package/services/createDeveloper";
import { getDeveloperById } from "@/package/services/getDeveloperById";
import { updateDeveloper } from "@/package/services/updateDeveloper";

import styles from "./developerModal.module.scss";
import { useLevelModal } from "../../niveis/levelModal";
import { formatDate } from "@/package/utils";
import { Select } from "@/package/components/select/select";

export const DeveloperModal: FC = () => {
  const { developerId, closeModal, mutate, isOpen, isLoading } =
    useDeveloperModal();
  const { levels } = useLevelModal();

  const [formValues, setFormValues] = useState<Omit<Developer, "id"> | null>(
    null
  );

  useEffect(() => {
    if (developerId) {
      const fetchDeveloper = async () => {
        const developer = await getDeveloperById(developerId);

        if (developer) {
          setFormValues(developer);
        }
      };

      fetchDeveloper();
    }
  }, [developerId]);

  const onClickOutside = useCallback(() => {
    setFormValues(null);

    closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", onClickOutside);

      return () => {
        window.removeEventListener("click", onClickOutside);
      };
    }
  }, [isOpen, onClickOutside]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormValues((prev) => ({ ...prev!, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (formValues)
        developerId
          ? await updateDeveloper(developerId, formValues)
          : await createDeveloper(formValues);

      mutate();
      closeModal();
    },
    [closeModal, formValues, developerId, mutate]
  );

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.developerModalContainer}
      >
        <h2>{`${
          developerId ? "Editar desenvolvedor" : "Adicionar desenvolvedor"
        }`}</h2>
        <div className={styles.modalForm}>
          <form action="submit" onSubmit={handleSubmit}>
            <Input
              name="name"
              label="Nome"
              value={formValues?.name}
              onChange={handleInputChange}
            />

            <fieldset className={styles.radioContainer}>
              <legend>Gênero</legend>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="F"
                  name="gender"
                  value="F"
                  checked={formValues?.gender === "F"}
                  onChange={handleInputChange}
                />
                <label htmlFor="F">Feminino</label>
              </div>

              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="M"
                  name="gender"
                  value="M"
                  checked={formValues?.gender === "M"}
                  onChange={handleInputChange}
                />
                <label htmlFor="M">Masculino</label>
              </div>
            </fieldset>

            <Input
              name="hobby"
              label="Hobby"
              value={formValues?.hobby}
              onChange={handleInputChange}
            />
            <Input
              name="birthday"
              label="Aniversário"
              value={formValues?.birthday && formatDate(formValues.birthday)}
              onChange={handleInputChange}
            />
            <Select
              name="level_id"
              value={formValues?.level_id}
              onChange={handleInputChange as any}
              label="Nível"
            >
              {levels.map(({ id, level }: Level) => (
                <option key={id} value={id}>
                  {level}
                </option>
              ))}
            </Select>

            <Button type="submit">Salvar</Button>
          </form>
        </div>
      </div>
      <div className={styles.modalBackground} onClick={onClickOutside}></div>
    </>
  );
};
