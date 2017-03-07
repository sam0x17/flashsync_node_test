  var fuse = require('fuse-bindings')

  var mountPath = process.platform !== 'win32' ? './mnt' : 'X'

  fuse.mount(mountPath, {
    options: ['debug'],
    readdir: function (path, cb) {
      path = path.toLowerCase()
      console.log('readdir(%s)', path)
      if (path === '/') return cb(0, ['test.txt'])
      cb(0)
    },
    getattr: function (path, cb) {
      path = path.toLowerCase()
      console.log('getattr(%s)', path)
      if (path === '/') {
        console.log('getattr matched /')
        cb(0, {
          mtime: new Date(),
          atime: new Date(),
          ctime: new Date(),
          size: 100,
          mode: 16877,
          uid: process.getuid ? process.getuid() : 0,
          gid: process.getgid ? process.getgid() : 0
        })
        return
      }

      if (path === '/test.txt') {
        console.log('getattr matched test.txt')
        cb(0, {
          mtime: new Date(),
          atime: new Date(),
          ctime: new Date(),
          size: 12,
          mode: 33188,
          uid: process.getuid ? process.getuid() : 0,
          gid: process.getgid ? process.getgid() : 0
        })
        return
      }
      console.log('unmatched getattr: ' + path)
      cb(fuse.ENOENT)
    },
    open: function (path, flags, cb) {
      path = path.toLowerCase()
      console.log('open(%s, %d)', path, flags)
      cb(0, 42) // 42 is an fd
    },
    read: function (path, fd, buf, len, pos, cb) {
      path = path.toLowerCase()
      console.log('read(%s, %d, %d, %d)', path, fd, len, pos)
      var str = 'hello world\n'.slice(pos)
      if (!str) return cb(0)
      buf.write(str)
      return cb(str.length)
    }
  }, function (err) {
    if (err) throw err
    console.log('filesystem mounted on ' + mountPath)
  })

  process.on('SIGINT', function () {
    fuse.unmount(mountPath, function (err) {
      if (err) {
        console.log('filesystem at ' + mountPath + ' not unmounted', err)
      } else {
        console.log('filesystem at ' + mountPath + ' unmounted')
      }
    })
  })
