"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDeveloperModal } from "./developerModal.context";

import type { Developer, Level } from "@/package/interfaces";

import { Input } from "@/package/components/input";
import { Button } from "@/package/components/button";
import { createDeveloper } from "@/package/services/createDeveloper";
import { getDeveloperById } from "@/package/services/getDeveloperById";
import { updateDeveloper } from "@/package/services/updateDeveloper";
import { useLevelModal } from "../../niveis/levelModal";
import { Select } from "@/package/components/select/select";

import styles from "./developerModal.module.scss";
import { formatDate } from "@/package/utils";

export const DeveloperModal: FC = () => {
  const { developerId, closeModal, mutate, isOpen } = useDeveloperModal();
  const { levels } = useLevelModal();
  const formInitialValues = useMemo(
    () => ({
      name: "",
      hobby: "",
      birthday: "",
      level_id: "",
      gender: "",
    }),
    []
  );
  const [formValues, setFormValues] =
    useState<Omit<Developer, "id">>(formInitialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (developerId) {
      const fetchDeveloper = async () => {
        const developer = await getDeveloperById(developerId);

        if (developer) {
          setFormValues(developer);
        }
      };
      setIsLoading(true);
      fetchDeveloper();
      setIsLoading(false);
    }
  }, [developerId]);

  const onClickOutside = useCallback(() => {
    setFormValues(formInitialValues);
    closeModal();
  }, [closeModal, formInitialValues]);

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
      setIsLoading(true);
      try {
        formValues.birthday = new Date(formValues.birthday).toISOString();
        developerId
          ? await updateDeveloper(developerId, formValues)
          : await createDeveloper(formValues);

        mutate();
        setIsLoading(false);
        closeModal();
      } catch (error) {
        window.alert(error);
        setIsLoading(false);
      }
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
              disabled={isLoading}
            />

            <fieldset
              className={`${styles.radioContainer} ${
                isLoading ? styles.disabledRadio : null
              }`}
            >
              <legend>Gênero</legend>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="F"
                  name="gender"
                  value="F"
                  checked={formValues?.gender === "F"}
                  onChange={handleInputChange}
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
                <label htmlFor="M">Masculino</label>
              </div>
            </fieldset>

            <Input
              name="hobby"
              label="Hobby"
              value={formValues?.hobby}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <Input
              name="birthday"
              label="Aniversário"
              type="date"
              value={formValues?.birthday.split("T")[0]}
              placeholder="dd/mm/aaaa"
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <Select
              name="level_id"
              value={formValues?.level_id}
              onChange={handleInputChange as any}
              label="Nível"
              disabled={isLoading}
            >
              {levels.map(({ id, level }: Level) => (
                <option key={id} value={id}>
                  {level}
                </option>
              ))}
            </Select>

            <Button disabled={isLoading} type="submit">
              {isLoading ? "Enviando" : "Salvar"}
            </Button>
          </form>
        </div>
      </div>
      <div className={styles.modalBackground} onClick={onClickOutside}></div>
    </>
  );
};
