import { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ModelSelection from "./components/ModelSelection"
import Constructor from "./components/Constructor"
import Profile from "./components/Profile"
import AuthModal from "./components/AuthModal"
import { BRANDS, MODELS } from "./phones"

function App() {
  const [activeTab, setActiveTab] = useState("models") // models | constructor | profile
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState(() => {
    const nickname = window.localStorage.getItem("nickname")
    return nickname ? { nickname } : null
  })

  const [chosenAccessory, setChosenAccessory] = useState("case")
  const [chosenBrand, setChosenBrand] = useState(BRANDS[0].key)
  const [chosenModel, setChosenModel] = useState(MODELS[BRANDS[0].key][0].value)

  useEffect(() => {
    const first = MODELS[chosenBrand] && MODELS[chosenBrand][0]
    if (first) setChosenModel(first.value)
  }, [chosenBrand])

  const [orders, setOrders] = useState([])

  const handleAuthSuccess = (nickname) => {
    setUser({ nickname })
    window.localStorage.setItem("nickname", nickname)
    setIsAuthOpen(false)
  }

  const handleCreateOrder = (summary) => {
    const id = `BB-${Date.now().toString().slice(-6)}`
    const newOrder = {
      id,
      createdAt: new Date().toISOString(),
      status: "В обработке",
      summary,
    }
    setOrders((prev) => [newOrder, ...prev])
    setActiveTab("profile")
  }

  return (
    <div className="app">
      <div>
        <Header
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onOpenAuth={() => setIsAuthOpen(true)}
          username={user?.nickname}
        />

        {activeTab === "models" && (
          <ModelSelection
            chosenAccessory={chosenAccessory}
            chosenBrand={chosenBrand}
            chosenModel={chosenModel}
            onChangeAccessory={setChosenAccessory}
            onChangeBrand={setChosenBrand}
            onChangeModel={setChosenModel}
          />
        )}

        {activeTab === "constructor" && (
          <Constructor
            chosenBrand={chosenBrand}
            chosenModel={chosenModel}
            onCreateOrder={handleCreateOrder}
          />
        )}

        {activeTab === "profile" && <Profile user={user} orders={orders} />}
      </div>

      <Footer />

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}

export default App
