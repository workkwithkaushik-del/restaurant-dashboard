import "./PanelHeader.css";

const ICON_COLLAPSE = "/assets/panel-header/collapse.svg";
const ICON_EXPAND = "/assets/panel-header/expand.svg";
const ICON_POPOUT = "/assets/panel-header/popout.svg";

function CollapseIcon() {
  return (
    <span className="panel-header__icon-wrap">
      <img className="panel-header__icon" src={ICON_COLLAPSE} alt="" />
    </span>
  );
}

function ExpandIcon() {
  return (
    <span className="panel-header__icon-wrap">
      <img className="panel-header__icon" src={ICON_EXPAND} alt="" />
    </span>
  );
}

function PopOutIcon() {
  return (
    <span className="panel-header__icon-wrap panel-header__icon-wrap--popout">
      <img
        className="panel-header__icon panel-header__icon--popout"
        src={ICON_POPOUT}
        alt=""
      />
    </span>
  );
}

export default function PanelHeader({
  className = "",
  state = "Opened",
  type = "Header",
  text = "Ask",
  subHeader = "Question Library",
  swapHeaderIcon = null,
  openLeftPanel = null,
  swapSubHeaderIcon = null,
}) {
  const isOpened = state === "Opened";
  const isHeader = type === "Header";

  const rootClassName = [
    "panel-header",
    isOpened ? "panel-header--open" : "panel-header--closed",
    isHeader ? "panel-header--header" : "panel-header--subheader",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const headerIcon = isOpened
    ? swapHeaderIcon || <CollapseIcon />
    : openLeftPanel || <ExpandIcon />;

  const subHeaderIcon = swapSubHeaderIcon || <PopOutIcon />;

  return (
    <div className={rootClassName} data-node-id="205:29">
      {isOpened && isHeader && (
        <span className="panel-header__text panel-header__text--header">
          {text}
        </span>
      )}
      {isHeader && headerIcon}
      {!isHeader && isOpened && (
        <span className="panel-header__text panel-header__text--subheader">
          {subHeader}
        </span>
      )}
      {!isHeader && subHeaderIcon}
    </div>
  );
}
