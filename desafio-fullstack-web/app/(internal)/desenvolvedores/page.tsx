import { DeveloperModalController } from "@/package/components/modal";
import { AddDeveloper } from "./addDeveloper/addDeveloper";
import { DeveloperList } from "./developerList";
import { DeveloperModal, DeveloperModalProvider } from "./developerModal";

import styles from "./developerPage.module.scss";

export default function Developers() {
  return (
    <DeveloperModalProvider>
      <div className={styles.developerPageContainer}>
        <section className={styles.addDeveloper}>
          <AddDeveloper />
        </section>
        <section className={styles.developerList}>
          <DeveloperList />
        </section>

        <section>
          <DeveloperModalController>
            <DeveloperModal />
          </DeveloperModalController>
        </section>
      </div>
    </DeveloperModalProvider>
  );
}
