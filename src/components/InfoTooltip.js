import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";


// Custom Tooltip Component
const InfoTooltip = ({ description }) => (
  <Tooltip title={description} arrow>
    <FontAwesomeIcon className="ml-2 text-gray-500" icon={faInfoCircle} />
  </Tooltip>
);

export default InfoTooltip;