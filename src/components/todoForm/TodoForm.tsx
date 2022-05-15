import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TodoForm() {
  const [todos, setTodos] = useState<[] | string[]>([]);
  const { t } = useTranslation();

  const handleSave = () => {
    console.log("Save");
  };

  useEffect(() => {
    setTodos(["nadita"]);
  }, []);

  return (
    <Container>
      {todos.map((todo) => (
        <TextField key={todo} value={todo} />
      ))}
      <Button type="button" onClick={handleSave}>
        {t("general.save")}
      </Button>
    </Container>
  );
}
