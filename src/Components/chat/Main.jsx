import ContentHeader from "./ContentHeader";
import EmailDetails from "./EmailDetails.jsx";
import EmailList from "./EmailList";
export default function Main()
{
    return (
        <main className="flex flex-wrap w-full h-full bg-dark-700">
          <ContentHeader />
          <div className="flex flex-row bg-blue-300" style={{ height: "calc(100% )" }}>
            <EmailList />
            
          </div>
        </main>
      );
}