import { container } from "tsyringe";

import BCryptHashProvider from "./HashProvider/implementations/BCrypthashProvider";
import IHashprovider from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashprovider>("HashProvider", BCryptHashProvider);
