
import re
import subprocess


def main():
    status = "none"
    message = ""

    try:
        fn = "./src/sample.lean"
        cmd = ["lean", fn]
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        _output, _error = process.communicate()

        flag = "ok"
        output = _output.decode()
        for line in output.split("\n"):
            if not line: continue
            flag = "none"
            message = "error"
            _fn,row,col,status,message = [l.strip() for l in line.split(":")]

            assert fn == _fn
            print(fn,row,col,status,message)
    except:
        flag = "error"
        message = "system error"
    finally:
        process.kill

    rt = {
        "status": flag,
        "message": message,
    }
    print(rt)
    return flag, message

if __name__=='__main__':
    main()
