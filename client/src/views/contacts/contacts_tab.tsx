// ContactsTab.tsx
import React, { useMemo, useState } from "react";
import styles from "./contactsTab.module.scss";

export type ContactsTabProps = {
  name?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  github?: string;
  linkedin?: string;
  locationLabel?: string;
  locationMapsUrl?: string;
  availability?: string;
};

const defaultProps: Required<ContactsTabProps> = {
  name: "Erik Sitnikov",
  email: "erik.sitnikov.fr@gmail.com",
  phone: "+33 7 80 33 54 90",
  telegram: "https://t.me/@delphin78",
  github: "https://github.com/yto4ka78",
  linkedin: "https://www.linkedin.com/in/erik-sitnikov-967227317/",
  locationLabel: "Orléans, France",
  locationMapsUrl: "https://maps.google.com/?q=Orléans, France",
  availability: "À distance ou au bureau (jusqu’à 100 km d’Orléans).",
};

const Icon = {
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  ),
  Phone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.53.74 3.88.74a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.68.74 3.88a1 1 0 01-.21 1.11l-2.41 2.41z" />
    </svg>
  ),
  Link: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M13.1 10.9a3 3 0 0 0-4.2 0l-3 3a3 3 0 0 0 4.2 4.2l1-1a1 1 0 0 1 1.4 1.4l-1 1a5 5 0 1 1-7-7l3-3a5 5 0 0 1 7 7 1 1 0 1 1-1.4-1.4 3 3 0 0 0 0-4.2Zm7-7a5 5 0 0 0-7 0l-1 1a1 1 0 1 0 1.4 1.4l1-1a3 3 0 0 1 4.2 4.2l-3 3a3 3 0 0 1-4.2 0 1 1 0 1 0-1.4 1.4 5 5 0 0 0 7 0l3-3a5 5 0 0 0 0-7Z" />
    </svg>
  ),
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  ),
  Copy: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M8 8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4Zm0 2H4v8h8v-8Zm2-2h8V4h-8v4Z" />
    </svg>
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M20.3 5.3a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.4l4.3 4.3 9.3-9.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  ),
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.rowLabel}>{label}</div>
      <div className={styles.rowValue}>{children}</div>
    </div>
  );
}

function Copyable({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className={styles.copyBtn}
      title="Copier dans le presse-papiers"
    >
      {children}
      {copied ? <Icon.Check /> : <Icon.Copy />}
    </button>
  );
}

function useVCard(props: Required<ContactsTabProps>) {
  return useMemo(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${props.name}`,
      props.email ? `EMAIL;TYPE=INTERNET:${props.email}` : "",
      props.phone ? `TEL;TYPE=CELL:${props.phone}` : "",
      props.linkedin ? `URL:${props.linkedin}` : "",
      props.github ? `URL:${props.github}` : "",
      props.locationLabel
        ? `ADR;TYPE=HOME:;;;${props.locationLabel.replace(/,/g, ";")}`
        : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    return URL.createObjectURL(blob);
  }, [props]);
}

export default function ContactsTab(incoming: ContactsTabProps) {
  const props = { ...defaultProps, ...incoming } as Required<ContactsTabProps>;
  const cardUrl = useVCard(props);

  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Me contacter</h2>
      </header>

      <div className={styles.grid}>
        <Row label="Email">
          <a href={`mailto:${props.email}`} className={styles.link}>
            <Icon.Mail />
            {props.email}
          </a>
          <Copyable text={props.email}>
            <span>Copier</span>
          </Copyable>
        </Row>

        <Row label="Téléphone">
          <a
            href={`tel:${props.phone.replace(/\s+/g, "")}`}
            className={styles.link}
          >
            <Icon.Phone />
            {props.phone}
          </a>
          <Copyable text={props.phone}>
            <span>Copier</span>
          </Copyable>
        </Row>

        <Row label="Telegram">
          <a
            href={props.telegram}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <Icon.Link />
            Ouvrir Telegram
          </a>
        </Row>

        <Row label="GitHub">
          <a
            href={props.github}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <Icon.Link /> {props.github.replace("https://", "")}
          </a>
        </Row>

        <Row label="LinkedIn">
          <a
            href={props.linkedin}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <Icon.Link /> {props.linkedin.replace("https://", "")}
          </a>
        </Row>

        <Row label="Localisation">
          <a
            href={props.locationMapsUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <Icon.MapPin /> {props.locationLabel}
          </a>
        </Row>

        <Row label="Disponibilité">
          <span>{props.availability}</span>
        </Row>
      </div>
    </section>
  );
}

/* -------------------------- ContactsTab.module.scss --------------------------

*/
