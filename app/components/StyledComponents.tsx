import styled from 'styled-components';
import Link from 'next/link';
import Modal from 'react-modal';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const Subtitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin: 10px 0;
  transition: background-color 0.2s;
  text-align: center;

  &:hover {
    background-color: #005bb5;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #0070f3;
  text-decoration: none;
  font-size: 1em;

  &:hover {
    text-decoration: underline;
  }
`;

export const TableContainer = styled.div`
  padding: 20px;
  max-width: 600px; /* 테이블 컨테이너의 최대 너비를 설정 */
  margin: 0 auto;
  overflow-x: auto;
  text-align: center; /* 테이블 컨테이너를 중앙 정렬 */
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  cursor: pointer; /* 테이블 셀에 커서를 추가하여 클릭 가능한 느낌을 줌 */
`;

export const LoadingText = styled.p`
  text-align: center;
`;

export const Message = styled.p`
  margin-top: 10px;
  color: green;
  text-align: center;
`;

export const ModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

export const ModalButton = styled(Button)`
  max-width: 200px;
  margin-top: 20px;
`;