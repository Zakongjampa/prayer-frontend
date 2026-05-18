import { Link } from "react-router-dom";

export default function List({ values }) {
  return (
    <ol>
      {values.map((value) => (
        <li key={value.number}>
          <Link to={`/prayer/${value.number}`} className="fs-2">
            {value.name}
          </Link>
        </li>
      ))}
    </ol>
  );
}
